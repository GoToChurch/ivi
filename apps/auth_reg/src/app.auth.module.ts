import {forwardRef, Module} from '@nestjs/common';
import {CommonModule} from "@app/common";
import {UsersModule} from "./users/users.module";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./auth/auth.module";
import {PassportModule} from "@nestjs/passport";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        PassportModule.register({session: true}),
        UsersModule,
        CommonModule,
        forwardRef(() => AuthModule),
    ]
})

export class AppAuthModule {
}
