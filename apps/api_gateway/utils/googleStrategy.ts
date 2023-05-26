import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy} from "passport-google-oauth20";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){

    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get("GOOGLE_CLIENT_ID"),
            clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),
            callbackURL: configService.get("GOOGLE_CALLBACKURL"),
            scope: ["profile", "email"]
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        return {
            profile: profile.emails
        }
    }
}