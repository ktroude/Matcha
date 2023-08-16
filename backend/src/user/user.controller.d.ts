import { Response } from 'express';
import { LocalSignUpDto } from 'src/auth/dto';
import { AuthService } from 'src/auth/auth.service';
export declare class UserController {
    private Auth;
    constructor(Auth: AuthService);
    userCreation(userData: LocalSignUpDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
