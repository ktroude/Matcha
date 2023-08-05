import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DataBaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
