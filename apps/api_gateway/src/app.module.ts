import {Module} from '@nestjs/common';
import {CommonModule} from "@app/common";
import {AppService} from "./app.service";
import {AppFilmsController} from "./controllers/app_films.controller";
import {AppAwardsController} from "./controllers/app_awards.controller";
import {AppCountriesController} from "./controllers/app_countries.controller";
import {AppGenresController} from "./controllers/app_genres.controller";
import {AppPersonsController} from "./controllers/app_persons.controller";
import {AppController} from "./app.controller";
import {AppAuthController} from "./controllers/app_auth.controller";
import {AppUsersController} from "./controllers/app_users.controller";
import {AppRolesController} from "./controllers/app_roles.controller";
import {VkStrategy} from "../utils/vkStrategy";
import {GoogleStrategy} from "../utils/googleStrategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {SessionSerializer} from "../utils/sessionSerializer";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "@app/common";
import {ConfigService} from "@nestjs/config";



@Module({
    imports: [
        PassportModule.register({session: true}),
        SequelizeModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: +configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: "users_auth",//configService.get('POSTGRES_DB'),
                models: [User],
                autoLoadModels: true,
                synchronize: true
            }),

            inject: [ConfigService],
        }),
        SequelizeModule.forFeature([User]),
        JwtModule.register({
            //secret: process.env.JWT_SECRET || 'SECRET',
            //signOptions: {
            //    expiresIn: '24h'
            //}
        }),
        PassportModule.register({session: true}),
        CommonModule.registerRmq({name: "USERS"}),
        CommonModule.registerRmq({name: "ROLES"}),
        CommonModule.registerRmq({name: "AUTH"}),
        CommonModule.registerRmq({name: 'FILM'}),
        CommonModule.registerRmq({name: 'COUNTRY'}),
        CommonModule.registerRmq({name: 'AWARD'}),
        CommonModule.registerRmq({name: 'GENRE'}),
        CommonModule.registerRmq({name: 'PERSON'}),
    ],
    controllers: [AppFilmsController, AppAwardsController, AppCountriesController, AppGenresController,
        AppPersonsController, AppController, AppAuthController, AppUsersController, AppRolesController],
    providers: [AppService, VkStrategy, GoogleStrategy, SessionSerializer]
})
export class AppModule {
}
