import {Module} from '@nestjs/common';
import {CommonModule, PostgresFilmDbModule} from "@app/common";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {RolesModule} from "./roles/roles.module";


@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: ".env"
        }),
        RolesModule,
        CommonModule
    ]
})

export class AppModule {
}