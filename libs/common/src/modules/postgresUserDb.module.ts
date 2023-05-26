import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "@app/common/models/users_model/user.model";
import {Role} from "@app/common/models/roles_model/role.model";
import {UserRoles} from "@app/common/models/users_model/user_roles.model";


@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                dialect: "postgres",
                name: "user_ivi",
                host: configService.get("POSTGRES_HOST"),
                port: +configService.get("POSTGRES_PORT"),
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_USER_DB"),
                models: [User, Role, UserRoles],
                autoLoadModels: true,
                synchronize: true
            }),

            inject: [ConfigService],
        }),
    ],
})
export class PostgresUserDbModule {}