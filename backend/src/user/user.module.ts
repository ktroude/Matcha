import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationModule } from '../validation/validation.module';
import { UserController } from './user.controller';

@Module({
  imports: [ValidationModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
