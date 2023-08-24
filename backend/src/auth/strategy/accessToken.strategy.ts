import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { MyEventEmitter } from '../common/middleware';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private authService: AuthService,
    private updateCookiesEmitter: MyEventEmitter,
  ) {
    super({
      jwtFromRequest: (req: Request) => {
        // extracteur maison pour recuperer le token dans un cookie
        console.log('req ===', req.cookies);
        if (req && req.cookies && req.cookies['access_token']) {
          console.log('je suis ici dans le cookie');
          return req.cookies['access_token'];
        }
        console.log('je suis null en fait');
        return null;
      },
      ignoreExpiration: true,
      secretOrKey: 'secret a mettre en .env',
    });
  }

  async validate(payload: any, req: Request, res: Response) {
    console.log(res);
    if (!payload) return payload;
    // Vérifier si l'access token est expiré
    try {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (payload.exp < currentTimestamp) {
        // L'access token est périmé, renouveler le token ici, a la fois le refresh et l'access
        console.log('JYFUUUUUUUUUUUUUUU');
        const token = await this.authService.getTokens(
          payload.sub,
          payload.email,
        );
        console.log('okkkk');
        const refreshToken = await this.authService.updateRefreshToken(
          payload.sub,
          token.refresh_token,
        );
            // Émettre un événement pour signaler la maj des cookies
        this.updateCookiesEmitter.emit('updateCookies',{
          acces_token : token.access_token,
          refresh_token: refreshToken,
        });
        // console.log('on passe aux cookies');
        // // Mettre à jour les cookies
        // res.cookie('access_token', token.access_token, {
        //   httpOnly: true,
        // });
        // console.log('cookie 1 OKKK');
        // res.cookie('refresh_token', refreshToken, {
        //   httpOnly: true,
        // });
        // console.log(res.cookie);
        return token.access_token;
      }
    } catch (err) {
      console.error(
        "erreur lors de la creation de nouveaux tokens après detection d'un access_token périmé",
        err,
      );
      throw new ForbiddenException('token error');
    }

    return payload;
  }

    // Ajoute d'une méthode pour s'abonner à l'événement
  onCookieUpdate(listener: (payload: any) => void) {
    this.updateCookiesEmitter.on('updateCookies', listener);
  }
}
