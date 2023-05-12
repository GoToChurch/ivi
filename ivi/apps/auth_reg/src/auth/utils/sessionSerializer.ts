import {PassportSerializer} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {UserService} from "../../users/user.service";


@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super()
    }
    async serializeUser(user: any, done: (err: Error, user: any) => void) {
        console.log("Serializer")
        done(null, user)
    }

    async deserializeUser(user: any, done: (err: Error, user: any) => void) {
        console.log("ЗДЕСЬ ЮЗАР")
        console.log(user.profile[0].value)
        const userDB = await this.userService.getUserByEmail(user.profile[0].value);
        console.log("Serialized User")
        return userDB ? done(null, user) : done(null, null)
    }
}