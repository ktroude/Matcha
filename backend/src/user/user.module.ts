import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserValidationService} from './user.validation.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, UserValidationService]
})
export class UserModule {}
