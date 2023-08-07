import { Controller, Get, Res, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalSignInDto, LocalSignUpDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
constructor(private authService:AuthService) {}

// Return 0 on success ou 1 on failure
    @Post('local/signup')
    async signUpLocal(@Body() dto: LocalSignUpDto ) {
        return await this.authService.signUpLocal(dto);
    }

    @Post('local/signin')
    async signInLocal(@Body() dto: LocalSignInDto): Promise <Tokens | null> {
        return await this.authService.signInLocal(dto);        
    }

    @Post('logout')
    logout() {
        this.authService.logout();
    }

    @Post('refresh')
    refreshToken() {
        this.authService.refreshToken();
    }
}