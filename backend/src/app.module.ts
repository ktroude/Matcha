import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';
import { ValidationModule } from './validation/validation.module';

@Module({
  imports: [DataBaseModule, ValidationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
