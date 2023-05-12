import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Params, Profile, Strategy, VerifyCallback} from "passport-vkontakte";



@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, "vk") {
    constructor() {
        super({
                clientID: "51626020",
                clientSecret: "nlDqfipOj0XmVUvoZABT",
                callbackURL: "http://127.0.0.1:3001/api/auth/vk/redirect",
                scope: ['status', 'email', 'friends', 'notify']
            },
            function (
                accessToken: string,
                refreshToken: string,
                params: Params,
                profile: Profile,
                done: VerifyCallback
            ) {

                console.log(profile.emails[0].value)
                //const user = userService.getUserByEmail(profile.emails[0].value)
                return done(null, {profile: profile.emails})
            })

    }
}