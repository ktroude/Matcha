import { JwtService } from '@nestjs/jwt';
import { LocalSignInDto, LocalSignUpDto } from './dto';
import { UserService } from 'src/user/user.service';
import { Tokens } from './types';
export declare class AuthService {
    private jwt;
    private userService;
    constructor(jwt: JwtService, userService: UserService);
    signInLocal(dto: LocalSignInDto): Promise<Tokens | null>;
    signUpLocal(dto: LocalSignUpDto): Promise<Tokens>;
    logout(userId: number): Promise<void>;
    refreshToken(userId: number, refreshToken: string): Promise<Tokens>;
    updateRefreshToken(userId: number, refreshToken: string): Promise<void>;
    getTokens(userId: number, email: string): Promise<Tokens>;
}
