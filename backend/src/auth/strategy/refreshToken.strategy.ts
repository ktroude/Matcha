import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   // comment recuperer le token --> sous la forme d'un bearer token
            ignoreExpiration: false,
            passReqToCallback: true,
            secretOrKey: 'secret a mettre en .env different de access_token è_é'
        });
    }

    validate(req:Request, payload:any) {
        const refreshToken = req.get('authorization').replace('Bearer', '').trim(); 
        return {
            ...payload,
            refreshToken,
        };
    }
}