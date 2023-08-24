import {
  Controller,
  Res,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalSignInDto, LocalSignUpDto } from './dto';
import { Response } from 'express';
import { RefreshTokenGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body() dto: LocalSignUpDto, @Res() res) {
    const tokens = await this.authService.signUpLocal(dto);
    if (tokens) {
      res.cookie('access_token', tokens.access_token, {
        httpOnly: true,
      });
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
      });
      res.status(HttpStatus.OK).json({ message: 'Connexion réussie' });
    } else
      res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Échec de la connexion' });
  }

    @Post('validate/mail')
    @HttpCode(HttpStatus.OK)
    async getUserData(@GetCurrentUserId() userId: number, @Body('token') token: string, @Res() res) {
      console.log("I'm in!");
      console.log(userId);
      //check du refresh token et de l'id pour valider
      //pb avec le back, l'id ne correspond pas (84 pour le user, 88 pour la db -> impossible de trouver dans la db donc crash)
      const validation = await this.authService.checkUserToken(userId, token);
      if (validation == true)
        return res.status(HttpStatus.OK).json({ message: 'Connexion réussie' });
      console.log("failed to authenticate account");
      return res
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Échec de la connexion' });
    }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() dto: LocalSignInDto, @Res() res: Response) {
    const tokens = await this.authService.signInLocal(dto);
    if (tokens) {
      res.cookie('access_token', tokens.access_token, {
        httpOnly: true,
      });
      res.cookie('refresh_token', tokens.refresh_token, {
        httpOnly: true,
      });
      res.end();
    } else throw new ForbiddenException('Connexion Refusée et ouais frr');
    return null;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshToken(userId, refreshToken);
  }
}
