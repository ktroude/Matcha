import { AuthService } from './auth.service';
import { LocalSignInDto, LocalSignUpDto } from './dto';
import { Tokens } from './types';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUpLocal(dto: LocalSignUpDto): Promise<Tokens>;
    signInLocal(dto: LocalSignInDto, res: Response): Promise<null>;
    logout(userId: number): Promise<void>;
    refreshToken(userId: number, refreshToken: string): Promise<Tokens>;
}
