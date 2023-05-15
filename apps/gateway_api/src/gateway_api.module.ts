import {Module} from '@nestjs/common';
import {UsersGatewayApiController} from './Controllers/users_gateway_api.controller';
import {GlobalModule} from "@lib/global";
import {AuthGatewayApiController} from "./Controllers/auth_gateway_api.controller";
import {RolesGatewayApiController} from "./Controllers/roles_gateway_api.controller";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'SECRET',
            signOptions: {
                expiresIn: '24h'
            }
        }),
        PassportModule.register({session: true}),
        GlobalModule.registerRmq({name: "USERS"}),
        GlobalModule.registerRmq({name: "ROLES"}),
        GlobalModule.registerRmq({name: "AUTH"})
    ],
    controllers: [UsersGatewayApiController, AuthGatewayApiController, RolesGatewayApiController],
    providers: []
})
export class GatewayApiModule {
}
