import { Module } from '@nestjs/common';
import { ValidationService } from './validation.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ValidationService],
})
export class ValidationModule {}