import {forwardRef, Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UserService} from "./user.service";
import {PostgresFilmDbModule, PostgresUserDbModule, Review, User, UserRoles} from "@app/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {CommonModule} from "@app/common";
import {AuthModule} from "../auth/auth.module";


@Module({
    controllers: [UsersController],
    providers: [UserService],
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get("JWT_SECRET"),
                signOptions: {
                    expiresIn: "24h"
                },
            }),
            inject: [ConfigService],
        }),
        CommonModule.registerRmq({name: "ROLES"}),
        PostgresUserDbModule,
        SequelizeModule.forFeature([User, UserRoles]),
        SequelizeModule.forFeature([Review]),
        forwardRef( () => AuthModule)],
    exports: [UserService]
})
export class UsersModule {}