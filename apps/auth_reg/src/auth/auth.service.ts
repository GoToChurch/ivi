import {BadRequestException, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserLoginDto} from "@app/common";
import {UserService} from "../users/user.service";
import * as bcrypt from "bcryptjs";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
    }

    //async login(dto: UserLoginDto) {
    //    const user = await this.validateUser(dto);
    //    const user_token = await this.generateToken(user)
    //    //await this.sendAuthToken(user_token);
    //    return user_token;
    //}
//
    //async generateToken(user: User) {
    //    const payload = {email: user.email, id: user.id, phone: user.phone, roles: user.roles}
    //    return {
    //        token: this.jwtService.sign(payload)
    //    }
    //}
//
    //private async validateUser(dto: UserLoginDto) {
    //    const user = await this.userService.getUserByEmail(dto.email);
    //    const passwordEquals = await bcrypt.compare(dto.password, user.password)
    //    if (user && passwordEquals) {
    //        return user;
    //    }
    //    throw new UnauthorizedException({message: 'Некорректный email или пароль'})
    //}
//
//
    //async validateUserByGoogleEmail(email: string) {
    //    const user = await this.userService.getUserByEmail(email);
    //    if (user) return user;
    //    return {message: "Такой пользователь не зарегистрирован"}
    //}

    //async signUp(dto: RegistrationDto): Promise<any> {
    //    const userExists = await this.userService.getUserByEmail(
    //        dto.email,
    //    );
    //    if (userExists) {
    //        throw new BadRequestException('Пользователь уже существует');
    //    }

    //    // Hash password
    //    const hash = await this.hashData(dto.password);
    //    const newUser = await this.userService.userRegistration({
    //        ...dto,
    //        password: hash,
    //    });
    //    const tokens = await this.getTokens(newUser._id, newUser.username);
    //    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    //    return tokens;
    //}

    async login(dto: UserLoginDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) throw new BadRequestException('User does not exist');
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches)
            throw new BadRequestException('Неверный пароль');
        const tokens = await this.getTokens(user.id.toString(), user.email, user.phone, user.roles);
        console.log(tokens.refreshToken)
        await this.updateRefreshToken(user.id.toString(), tokens.refreshToken);
        return tokens;
    }

    async logout(userId: string) {
        return this.userService.updateUser({refreshToken: null}, userId);
    }

    async hashData(data: string) {
        return await bcrypt.hash(data, 5);
    }

    async updateRefreshToken(userId: string, refreshToken: string) {
        //const hashedRefreshToken = await this.hashData(refreshToken);
        //await this.userService.updateUser({
        //    refreshToken: hashedRefreshToken,
        //}, userId);
        await this.userService.updateUser({
            refreshToken: refreshToken,
        }, userId)
    }

    async getTokens(userId: string, email: string, phone: string, roles: [string]) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    email,
                    phone,
                    roles
                },
                {
                    secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
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
                    secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }
}
