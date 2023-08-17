import { Module } from '@nestjs/common';
import { InterestService } from './interest.service';
import { InterestController } from './interest.controller';
import { InterestValidationService } from './interest.validation.service';
import { UserService } from 'src/user/user.service';
import { UserValidationService } from 'src/user/user.validation.service';

@Module({
  imports: [],
  controllers: [InterestController],
  providers: [
    InterestService,
    InterestValidationService,
    UserService,
    UserValidationService,
  ],
})
export class InterestModule {}
