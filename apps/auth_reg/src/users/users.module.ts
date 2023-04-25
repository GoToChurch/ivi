import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UserService} from "./user.service";
import {User} from "./user.model";
import {SequelizeModule} from "@nestjs/sequelize";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {GlobalModule} from "@lib/global";
import {AuthModule} from "../auth/auth.module";


@Module({
    controllers: [UsersController],
    providers: [UserService],
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                    expiresIn: '24h'
                },
            }),
            inject: [ConfigService],
        }),
        GlobalModule.registerRmq({name: "ROLES"}),
        SequelizeModule.forFeature([User]),
        forwardRef( () =>AuthModule)],
    exports: [UserService]
})
export class UsersModule {}