import {Injectable, UnauthorizedException} from "@nestjs/common";
import {User} from "@lib/global";
import {JwtService} from "@nestjs/jwt";
import {UserLoginDto} from "./AUTH_DTO/userLoginDto";
import {UserService} from "../users/user.service";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
    constructor(
                private readonly userService: UserService,
                private readonly jwtService: JwtService) {
    }

    async login(dto: UserLoginDto) {
        const user = await this.validateUser(dto);
        const user_token = await this.generateToken(user)
        //await this.sendAuthToken(user_token);
        return user_token;
    }

    async generateToken(user: User) {
        const payload = {email: user.email, id: user.id, roles: user.roles}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(dto: UserLoginDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        const passwordEquals = await bcrypt.compare(dto.password, user.password)
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    }


    async validateUserByGoogleEmail(email: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user) return user;
        return {message: "Такой пользователь не зарегистрирован"}
    }
}
