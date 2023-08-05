import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private User:UserService){}

    @Post('createUser')
    async createUser():Promise<Boolean>{
    
        console.log("cvgdje cbkjzdnemjcne");
        await this.User.createUser("paco", "lebogoss","soloqueuedu06@gmail.com", "pamela", "tO@to123");
        
        return true; //return token
    }
}
