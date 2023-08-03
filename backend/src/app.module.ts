import { Module } from '@nestjs/common';
import { DataBaseModule } from './database/database.module';

@Module({
  imports: [DataBaseModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}
