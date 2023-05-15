import {forwardRef, Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {GlobalModule, User} from "@lib/global";
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";
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
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: "users_auth",
            models: [User],
            autoLoadModels: true
        }),
        UsersModule,
        GlobalModule,
        forwardRef(() =>AuthModule),

    ]

})

export class AppModule {
}
