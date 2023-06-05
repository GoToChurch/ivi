import {BadRequestException, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Role, UserLoginDto} from "@app/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../users/user.service";
import * as bcrypt from "bcryptjs";
import {ConfigService} from "@nestjs/config";


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
                private readonly jwtService: JwtService,
                private readonly configService: ConfigService) {}

    async login(userLoginDto: UserLoginDto) {
        const user = await this.userService.getUserByEmail(userLoginDto.email);

        if (!user) {
            throw new BadRequestException("User does not exist");
        }

        const passwordMatches = await bcrypt.compare(userLoginDto.password, user.password);

        if (!passwordMatches) {
            throw new BadRequestException("Неверный пароль");
        }

        const tokens = await this.getTokens(user.id.toString(), user.email, user.phone, user.roles);
        await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);

        return tokens;
    }

    async logout(headers: any) {
        const user = this.jwtService.decode(headers["authorization"].split(" ")[1]);
        await this.userService.updateUser({refreshToken: null}, user.sub);

        return {
            msg: `Пользователь ${user['email']} вышел из аккаунта`
        }
    }

    async hashData(data: string) {
        return await bcrypt.hash(data, 5);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        await this.userService.updateUser({
            refreshToken: refreshToken,
        }, userId)
    }

    async getTokens(userId: string, email: string, phone: string, roles: Role[]) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                    phone,
                    roles
                },
                {
                    secret: this.configService.get<string>("JWT_ACCESS_SECRET"),
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                    phone,
                    roles
                },
                {
                    secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
                    expiresIn: "7d",
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
