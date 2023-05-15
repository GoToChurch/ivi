import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {CommonService} from "@app/common";
import {AccessTokenStrategy} from "./Utils/accessToken.strategy";
import {RefreshTokenStrategy} from "./Utils/refreshToken.strategy";
import {ConfigService} from "@nestjs/config";



@Module({
    controllers: [AuthController],
    providers: [AuthService, CommonService, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthService, JwtModule],
    imports: [
        JwtModule.register({}),
        //JwtModule.register({
            //secret: process.env.JWT_SECRET || 'SECRET',
            //signOptions: {
            //    expiresIn: '24h'
            //}
        //}),
        forwardRef(() => UsersModule)
    ]
})
export class AuthModule {
}