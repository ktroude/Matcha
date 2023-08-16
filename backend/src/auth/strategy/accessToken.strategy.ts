import { Injectable, Req } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: (req: Request) => {           // extracteur maison pour recuperer le token dans un cookie
                if (req && req.cookies) {
                    return req.cookies['access_token'];
                }
                return null;
            },
            ignoreExpiration: false,
            secretOrKey: 'secret a mettre en .env'
        });
    }

    validate(payload:any) {
        return payload;
    }
}