import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy} from "passport-google-oauth20";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){

    constructor(//@Inject("AUTH") private readonly usersClient: ClientProxy,
                private readonly configService: ConfigService) {
        super({
            clientID: configService.get("GOOGLE_CLIENT_ID"),//"826217952571-3fb4j2n58chc41ans1tnms76bnmclucp.apps.googleusercontent.com",
            clientSecret: configService.get("GOOGLE_CLIENT_SECRET"),//"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",
            callbackURL: configService.get("GOOGLE_CALLBACKURL"),//"http://127.0.0.1:3000/api/auth/google/redirect",
            scope: ["profile", "email"]
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        return {
            profile: profile.emails
        }
    }
}