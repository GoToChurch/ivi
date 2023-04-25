import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-vkontakte";
import {UserService} from "../../users/user.service";
import {Profile} from "passport-google-oauth20";

@Injectable()
export class VkStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            clientID: "",
            clientSecret: "",
            callbackURL: "http://127.0.0.1:3001/api/auth/vk/redirect",
            scope: ['profile']
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile) {
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile.emails[0].value)
        //return this.authClient.send({cmd: "google_login"}, {profile: profile.emails[0].value})
        const user = await this.userService.getUserByEmail(profile.emails[0].value);
        console.log(user)
        return user

    }
}