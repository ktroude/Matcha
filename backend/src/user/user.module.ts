import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserValidationService } from './user.validation.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserValidationService, AuthService, JwtService],
})
export class UserModule {}
