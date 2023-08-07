import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { InterestValidationService } from './interest.validation.service';

@Module({
  imports: [],
  controllers: [InterestController],
  providers: [InterestService, InterestValidationService],
})
export class InterestModule {}