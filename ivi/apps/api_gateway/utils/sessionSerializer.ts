import {PassportSerializer} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {AppService} from "../src/app.service";


@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly usersService: AppService) {
        super()
    }
    async serializeUser(user: any, done: (err: Error, user: any) => void) {
        done(null, user)
    }

    async deserializeUser(user: any, done: (err: Error, user: any) => void) {
        // const userDB = await this.usersService.getUserByEmail(user.profile[0].value);
        // return userDB ? done(null, userDB) : done(null, null)
    }
}