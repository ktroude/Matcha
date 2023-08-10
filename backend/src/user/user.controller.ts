import { Body, Controller, ForbiddenException, Get, Post, Req } from '@nestjs/common';
import { LocalSignUpDto } from 'src/auth/dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {

constructor(private Auth:AuthService){}

@Post('userCreation')
async userCreation(@Body('user') userData: LocalSignUpDto): Promise<boolean> {
    if (!userData){
        throw new ForbiddenException('Invalid dto');
    }
    try {
        if (userData && userData.username) {
            await this.Auth.signUpLocal(userData);
            return true;
        } else {
            console.log("Invalid userData:", userData);
            return false;
        }
    } catch (error) {
        console.error("Error parsing request body:", error);
        return false;
    }
}
}
