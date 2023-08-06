import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';

@Module({
  imports: [DataBaseModule, UserModule, InterestModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
