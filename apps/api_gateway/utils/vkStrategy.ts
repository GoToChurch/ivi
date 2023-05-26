import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Params, Profile, Strategy, VerifyCallback} from "passport-vkontakte";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class VkStrategy extends PassportStrategy(Strategy, "vk") {
    constructor( private readonly configService: ConfigService) {
        super({
                clientID: configService.get("VK_CLIENT_ID"),
                clientSecret: configService.get("VK_CLIENT_SECRET"),
                callbackURL: configService.get("VK_CALLBACKURL"),
                scope: ["status", "email", "friends", "notify"]
            },
            function (
                accessToken: string,
                refreshToken: string,
                params: Params,
                profile: Profile,
                done: VerifyCallback
            ) {
                return done(null, {profile: profile.emails})
            })
    }
}