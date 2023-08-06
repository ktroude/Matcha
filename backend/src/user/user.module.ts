import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ValidationService } from 'src/validation/validation.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ValidationService]
})
export class UserModule {}
