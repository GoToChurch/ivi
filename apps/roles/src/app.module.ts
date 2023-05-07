import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {CommonModule} from "@app/common";
import {Role} from "@app/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RolesModule} from "./roles/roles.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        //SequelizeModule.forRoot({
        //    dialect: 'postgres',
        //    host: process.env.POSTGRES_HOST,
        //    port: Number(process.env.POSTGRES_PORT),
        //    username: process.env.POSTGRES_USER,
        //    password: process.env.POSTGRES_PASSWORD,
        //    database: "template1",
        //    models: [Role],
        //    autoLoadModels: true
        //}),
        SequelizeModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                dialect: "postgres",
                host: configService.get('POSTGRES_HOST'),
                port: +configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: "template1",
                models: [Role],
                autoLoadModels: true,
                synchronize: true
            }),

            inject: [ConfigService],
        }),
        RolesModule,
        CommonModule
    ]

})

export class AppModule {
}