import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { ValidationModule } from 'src/validation/validation.module';
import { ValidationService } from 'src/validation/validation.service';

@Module({
  imports: [ValidationModule],
  controllers: [InterestController],
  providers: [InterestService, ValidationService],
})
export class InterestModule {}