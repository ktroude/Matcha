import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationModule } from '../validation/validation.module';
import { UserController } from './user.controller';
import { ValidationService } from 'src/validation/validation.service';

@Module({
  imports: [ValidationModule],
  controllers: [UserController],
  providers: [UserService, ValidationService]
})
export class UserModule {}
