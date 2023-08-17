import {
  Controller,
  NotFoundException,
  Get,
  HttpCode,
  HttpStatus,
  Body,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetCurrentUserId } from 'src/auth/common/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async getUserData(@GetCurrentUserId() userId: number) {
    const { password, refresh_token, ...userData } =
      await this.userService.findUserById(userId);
    if (!userData) throw new NotFoundException('Utilisateur introuvable');
    return userData;
  }

  @Post('update/email')
  @HttpCode(HttpStatus.OK)
  async updateEmail(
    @GetCurrentUserId() userId: number,
    @Body('email') email: string,
  ) {
    return await this.userService.updateEmail(userId, email);
  }

  @Post('update/password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @GetCurrentUserId() userId: number,
    @Body('password') password: string,
  ) {
    return await this.userService.updatePassword(userId, password);
  }

  @Post('update/firstname')
  @HttpCode(HttpStatus.OK)
  async updateFirstname(
    @GetCurrentUserId() userId: number,
    @Body('firstname') firstname: string,
  ) {
    return await this.userService.updateFirstname(userId, firstname);
  }

  @Post('update/lastname')
  @HttpCode(HttpStatus.OK)
  async updateLastname(
    @GetCurrentUserId() userId: number,
    @Body('lastname') lastname: string,
  ) {
    return await this.userService.updateLastname(userId, lastname);
  }

  @Post('update/bio')
  @HttpCode(HttpStatus.OK)
  async updateBio(
    @GetCurrentUserId() userId: number,
    @Body('bio') bio: string,
  ) {
    return await this.userService.updateBio(userId, bio);
  }

  @Post('update/gender')
  @HttpCode(HttpStatus.OK)
  async updateGender(
    @GetCurrentUserId() userId: number,
    @Body('gender') gender: string,
  ) {
    return await this.userService.updateGender(userId, gender);
  }

  @Post('update/pref')
  @HttpCode(HttpStatus.OK)
  async updatePref(
    @GetCurrentUserId() userId: number,
    @Body('pref') pref: string[],
  ) {
    return await this.userService.updateSexualPref(userId, pref);
  }

  @Post('update/username')
  @HttpCode(HttpStatus.OK)
  async updateUsername(
    @GetCurrentUserId() userId: number,
    @Body('username') username: string,
  ) {
    return await this.userService.updateUsername(userId, username);
  }
}
