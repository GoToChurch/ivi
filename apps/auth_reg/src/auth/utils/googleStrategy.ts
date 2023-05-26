import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy} from "passport-google-oauth20";
import {Injectable} from "@nestjs/common";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            clientID: "826217952571-3fb4j2n58chc41ans1tnms76bnmclucp.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://127.0.0.1:3001/api/auth/google/redirect",
            scope: ["profile", "email"]
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        //console.log(accessToken)
        //console.log(refreshToken)
        //console.log(profile.emails[0].value)
        //return this.authClient.send({cmd: "google_login"}, {profile: profile.emails[0].value})
        //const user = await this.userService.getUserByEmail(profile.emails[0].value);

        return {
            profile: profile.emails
        }
    }
}