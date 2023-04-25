import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {GlobalModule, Role} from "@lib/global";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "../../auth_reg/src/auth/auth.module";
import {RolesModule} from "./roles/roles.module";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: "roles",
            models: [Role],
            autoLoadModels: true
        }),
        RolesModule,
        GlobalModule,
        forwardRef(() =>AuthModule)
    ]

})

export class AppModule {
}