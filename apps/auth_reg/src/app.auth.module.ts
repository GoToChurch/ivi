import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {CommonModule} from "@app/common";
import {User} from "@app/common";
import {UsersModule} from "./users/users.module";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {PassportModule} from "@nestjs/passport";




@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        PassportModule.register({session: true}),
        //SequelizeModule.forRoot({
        //    dialect: 'postgres',
        //    host: process.env.POSTGRES_HOST,
        //    port: Number(process.env.POSTGRES_PORT),
        //    username: process.env.POSTGRES_USER,
        //    password: process.env.POSTGRES_PASSWORD,
        //    database: "template0",
        //    models: [User],
        //    autoLoadModels: true
    //}),
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
        UsersModule,
        CommonModule,
        forwardRef(() =>AuthModule),
    ]
})

export class AppAuthModule {
}
