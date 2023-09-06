import {
  Controller,
  Res,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalSignInDto, LocalSignUpDto } from './dto';
import { Request, Response } from 'express';
import { RefreshTokenGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body() dto: LocalSignUpDto, @Res() res:Response) {
    try {
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
    } catch {
      throw new ForbiddenException('Connexion Refusée');
    }
  }

  @Post('validate/mail')
  @HttpCode(HttpStatus.OK)
  async getUserData(
    @GetCurrentUserId() userId: number,
    @Body('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const validation = await this.authService.checkUserToken(userId, token);
      if (validation == true)
        return res.status(HttpStatus.OK).json({ message: 'Connexion réussie' });
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Échec de la connexion' });
    } catch {
      throw new ForbiddenException('Connexion Refusée');
    }
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signInLocal(@Body() dto: LocalSignInDto, @Res() res: Response) {
    try {
      const tokens = await this.authService.signInLocal(dto);
      if (tokens) {
        res.cookie('access_token', tokens.access_token, {
          httpOnly: true,
        });
        res.cookie('refresh_token', tokens.refresh_token, {
          httpOnly: true,
        });
        res.end();
      } else throw new ForbiddenException('Connexion Refusée');
      return null;
    } catch {
      throw new ForbiddenException('Connexion Refusée');
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @GetCurrentUserId() userId: number,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (req && req.cookies && req.cookies['refresh_token']) {
      const refreshToken = req.cookies['refresh_token'];
      const tokens = await this.authService.refreshToken(userId, refreshToken);
      if (tokens) {
        res.cookie('access_token', tokens.access_token, {
          httpOnly: true,
        });
        res.cookie('refresh_token', tokens.refresh_token, {
          httpOnly: true,
        });
        res.end();
      } else throw new ForbiddenException('Connexion Refusée');
      return null;
    }
  }
}
