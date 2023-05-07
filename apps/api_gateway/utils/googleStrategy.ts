import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy} from "passport-google-oauth20";
import {Inject, Injectable} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";



@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(@Inject("AUTH") private readonly usersClient: ClientProxy) {
        super({
            clientID: "826217952571-3fb4j2n58chc41ans1tnms76bnmclucp.apps.googleusercontent.com",
            clientSecret: "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",
            callbackURL: "http://127.0.0.1:3000/api/auth/google/redirect",
            scope: ['profile', 'email']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        return {profile: profile.emails}


    }
}