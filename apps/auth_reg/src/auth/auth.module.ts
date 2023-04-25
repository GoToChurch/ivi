import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {GlobalService} from "@lib/global";
import {GoogleStrategy} from "./utils/googleStrategy";
import {SessionSerializer} from "./utils/sessionSerializer";
import {VkStrategy} from "./utils/vkStrategy";

@Module({
    controllers: [AuthController],
    providers: [AuthService, GlobalService, GoogleStrategy, SessionSerializer, VkStrategy],
    exports: [AuthService, JwtModule],
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
        forwardRef(() => UsersModule)
    ]
})
export class AuthModule {
}