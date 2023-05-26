import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {CommonService} from "@app/common";
import {AccessTokenStrategy} from "./utils/accessToken.strategy";
import {RefreshTokenStrategy} from "./utils/refreshToken.strategy";


@Module({
    controllers: [AuthController],
    providers: [AuthService, CommonService, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthService, JwtModule],
    imports: [
        JwtModule.register({}),
        forwardRef(() => UsersModule)
    ]
})
export class AuthModule {
}