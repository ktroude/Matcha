import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserValidationService } from 'src/user/user.validation.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
import { MyEventEmitter } from './common/middleware';

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserValidationService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    MyEventEmitter
  ],
  exports: [AuthService],
})
export class AuthModule {}
