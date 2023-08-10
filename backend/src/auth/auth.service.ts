import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalSignInDto, LocalSignUpDto } from './dto';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private userService: UserService) {}
 

  async signInLocal(dto: LocalSignInDto): Promise<Tokens | null> {
    const user = await this.userService.findUserByUsername(dto.username);
    if (!user)
      return null; // mauvais pseudo
    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (passwordMatches === false)
      return null; // mauvais mot de passe
    const token = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, token.refresh_token);
    return token;
  }

  async signUpLocal(dto: LocalSignUpDto) {
    const user = await this.userService.createUser(
      dto.firstname,
      dto.lastname,
      dto.email,
      dto.username,
      dto.password,
    );
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
  }

  logout(userId: number) {
    return this.userService.deleteRefrechTocken(userId);
  }

  async refreshToken(userId: number, refreshToken:string) {
    const user = await this.userService.findUserById(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Connexion Refusée')
    const refreshTokenMatches = await bcrypt.compare(refreshToken, user.refresh_token);
    if (refreshTokenMatches === false)
      throw new ForbiddenException('Connexion Refusée')
    const token = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, token.refresh_token);
    return token;
  }


  ////// UTILS //////

   async updateRefreshToken(userId:number, refreshToken: string) {
    const hash = bcrypt.hashSync(refreshToken, 16);
    await this.userService.updateRefreshToken(userId, hash);
  }

  async getTokens(userId: number, email: string) :Promise<Tokens> {
    //fonction pour signer le user et lui atribuer un accessT et un refreshT
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'le secret de AT dans .env',
          expiresIn: 60 * 15, // timer en sec donc ici 15 min
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'le secret du RT dans le .env',
          expiresIn: 60 * 60 * 24 * 7, // timer set sur une semaine
        },
      ),
    ]);
    return  {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
  }

}
