import {JwtModule} from "@nestjs/jwt";
import {UsersModule} from "../users/users.module";
import {AuthService} from "./auth.service";
import {forwardRef, Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {CommonService} from "@app/common";



@Module({
    controllers: [AuthController],
    providers: [AuthService, CommonService],
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