import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationModule } from '../validation/validation.module';
import { ValidationService } from '../validation/validation.service';
import { UserController } from './user.controller';

@Module({
  imports: [ValidationModule],
  controllers: [UserController],
  providers: [UserService, ValidationService]
})
export class UserModule {}
