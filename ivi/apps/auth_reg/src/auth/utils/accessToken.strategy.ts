import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import {ConfigService} from "@nestjs/config";

type JwtPayload = {
    sub: string;
    email: string;
    phone: string,
    roles: [string]
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get("JWT_ACCESS_SECRET"),
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}