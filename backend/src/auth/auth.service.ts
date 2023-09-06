import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalSignInDto, LocalSignUpDto } from './dto';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private userService: UserService) {}

  async signInLocal(dto: LocalSignInDto): Promise<Tokens | null> {
    const user = await this.userService.findUserByUsername(dto.username);
    if (!user) return null; // mauvais pseudo
    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (passwordMatches === false) return null; // mauvais mot de passe
    let token = await this.getTokens(user.id, user.email);
    token.refresh_token = await this.updateRefreshToken(user.id, token.refresh_token);
    return token;
  }

  async sendMail(usermail: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 587,
      tls: {
        rejectUnauthorized: false,
        ciphers: 'TLS_CHACHA20_POLY1305_SHA256',
      },
      auth: {
        type: "login",
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.MAIL_ACCOUNT,
      to: usermail,
      subject: 'Matcha account validation',
      text: 'http://localhost:8080/validation?token=' + token,
    };
    transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log("token == ", token);
        console.log("usermail == ", usermail);
        console.log("error == ", error);
        console.log("info == ", info);
      }
      else
        console.log("success");
    });
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
    await this.sendMail(dto.email, tokens.refresh_token);
    return tokens;
  }

  logout(userId: number) {
    return this.userService.deleteRefrechTocken(userId);
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findUserById(userId);
    if (!user || !user.refresh_token) { 
      throw new ForbiddenException('Connexion Refusée');
    }
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refresh_token,
    );
    if (refreshTokenMatches === false)
      throw new ForbiddenException('Connexion Refusée');
    let token = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, token.refresh_token);
    return token;
  }

  async checkUserToken(userId: number, refreshToken: string) {
    const user = await this.userService.findUserById(userId);
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Connexion Refusée');
    if (refreshToken !== user.refresh_token)
      throw new ForbiddenException('Connexion Refusée');
    const token = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, token.refresh_token);
    //valider le compte dans la database
    return true;
  }

  ////// UTILS //////

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hash = bcrypt.hashSync(refreshToken, 10);
    await this.userService.updateRefreshToken(userId, hash);
    return hash;
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    //fonction pour signer le user et lui atribuer un accessT et un refreshT
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'secret a mettre en .env',
          expiresIn: 60 * 15, // Timer en sec donc ici 15 min
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'le secret du RT dans le .env',
          expiresIn: 60 * 60 * 24 * 7, // Timer set sur une semaine
        },
      ),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
