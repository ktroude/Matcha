import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { InterestModule } from './interest/interest.module';
import { AuthModule } from './auth/auth.module';
import { InteractionModule } from './interactions/interactions.module';
import { PictureModule } from './pictures/picture.module';

@Module({
  imports: [
    DataBaseModule,
    InterestModule,
    UserModule,
    AuthModule,
    InteractionModule,
    PictureModule,
  ],
})
export class AppModule {}
