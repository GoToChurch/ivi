import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Params, Profile, Strategy, VerifyCallback} from "passport-vkontakte";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, "vk") {
    constructor( private readonly configService: ConfigService) {
        super({
                clientID: configService.get("VK_CLIENT_ID"),//"51626020",
                clientSecret: configService.get("VK_CLIENT_SECRET"),//"nlDqfipOj0XmVUvoZABT",
                callbackURL: configService.get("VK_CALLBACKURL"),//"http://127.0.0.1:3000/api/auth/vk/redirect",
                scope: ["status", "email", "friends", "notify"]
            },
            function (
                accessToken: string,
                refreshToken: string,
                params: Params,
                profile: Profile,
                done: VerifyCallback
            ) {
                console.log(profile.emails[0].value)
                return done(null, {profile: profile.emails})
            })

    }
}