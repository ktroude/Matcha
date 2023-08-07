import { Controller, Get, Res, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalSignInDto, LocalSignUpDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AccessTokenGuard, RefreshTokenGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';

@Controller('auth')
export class AuthController {
constructor(private authService:AuthService) {}

// Return 0 on success ou 1 on failure
    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    async signUpLocal(@Body() dto: LocalSignUpDto ) {
        return await this.authService.signUpLocal(dto);
    }

    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    async signInLocal(@Body() dto: LocalSignInDto): Promise <Tokens | null> {
        return await this.authService.signInLocal(dto);        
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number ) {
        return this.authService.logout(userId);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string  ) {
        return this.authService.refreshToken(userId, refreshToken);
    }
}