import { Body, Controller, ForbiddenException, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LocalSignUpDto } from 'src/auth/dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private Auth: AuthService) {}

  @Post('userCreation')
  async userCreation(@Body('user') userData: LocalSignUpDto, @Res() res: Response) {
    if (!userData) {
      throw new ForbiddenException('Invalid dto');
    }
    try {
      if (userData && userData.username) {
        const tokens = await this.Auth.signUpLocal(userData);
        console.log(tokens);

        res.cookie('access_token', tokens.access_token, { maxAge: 3600000, httpOnly: false });
        res.cookie('refresh_token', tokens.refresh_token, { maxAge: 3600000, httpOnly: false });

        return res.status(200).json({ success: true });
      } else {
        console.log("Invalid userData:", userData);
        return res.status(500).json({ success: false, message: 'Invalid user data' });
      }
    } catch (error) {
      console.error("Error parsing request body:", error);
      return res.status(500).json({ success: false, message: 'Error parsing request body' });
    }
  }
}
