import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';
import { AuthModule } from './auth/auth.module';
import { InteractionModule } from './interactions/interactions.module';

@Module({
  imports: [
    DataBaseModule,
    InterestModule,
    UserModule,
    AuthModule,
    InteractionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
