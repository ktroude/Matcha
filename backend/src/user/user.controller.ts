import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private User:UserService){}

    @Post('createUser')
    async createUser():Promise<Boolean>{
        this.User.createUser("paco", "lebogoss","grossequeuedu06@gmail.com", "pamela", "toto123");
        return true;
    }
}
