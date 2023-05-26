import {PassportSerializer} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {UserService} from "../../users/user.service";


@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UserService) {
        super()
    }
    async serializeUser(user: any, done: (err: Error, user: any) => void) {
        done(null, user)
    }

    async deserializeUser(user: any, done: (err: Error, user: any) => void) {
        const userDB = await this.userService.getUserByEmail(user.profile[0].value);
        return userDB ? done(null, user) : done(null, null);
    }
}