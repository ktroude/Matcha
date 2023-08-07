import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DataBaseModule, InterestModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
