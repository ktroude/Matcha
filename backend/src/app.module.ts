import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { ValidationModule } from './validation/validation.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DataBaseModule, ValidationModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
