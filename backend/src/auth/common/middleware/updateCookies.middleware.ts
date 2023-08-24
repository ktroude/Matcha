import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { AccessTokenStrategy } from 'src/auth/strategy/accessToken.strategy';


@Injectable()
export class UpdateCookiesMiddleware implements NestMiddleware {
  constructor(private readonly accessTokenStrategy: AccessTokenStrategy) {}

  use(req: Request, res: Response, next: () => void) {
    // S'abonnez à l'événement lors de la création du middleware
    this.accessTokenStrategy.onCookieUpdate((payload) => {
      console.log('on passe aux cookies', payload);
      // Mettre à jour les cookies
      res.cookie('access_token', payload.acces_token, {
        httpOnly: true,
      });
      console.log('cookie 1 OKKK');
      res.cookie('refresh_token', payload.refresh_token, {
        httpOnly: true,
      });
      console.log(res.cookie);
    });

    next(); // Appeler next() pour passer au middleware suivant
  }
}





