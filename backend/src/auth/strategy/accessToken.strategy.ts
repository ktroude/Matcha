import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   // comment recuperer le token --> sous la forme d'un bearer token
            ignoreExpiration: false,
            secretOrKey: 'secret a mettre en .env'
        });
    }

    validate(payload:any) {
        return payload;
    }
}