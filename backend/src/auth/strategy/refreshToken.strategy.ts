import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        if (req && req.cookies && req.cookies['refresh_token']) {
          return req.cookies['refresh_token'];
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: 'le secret du RT dans le .env',
    });
  }

  validate(payload: any) {
    return payload;
  }
}
