import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {CommonModule} from "@app/common";
import {Role} from "@app/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RolesModule} from "./roles/roles.module";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),

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