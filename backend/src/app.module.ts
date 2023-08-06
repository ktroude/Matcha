import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';
import { AuthModule } from './auth/auth.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [DataBaseModule, UserModule, InterestModule, AuthModule, ValidationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
