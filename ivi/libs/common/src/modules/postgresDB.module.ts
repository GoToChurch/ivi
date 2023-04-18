import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: +configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                // models: [Film, Award, Nomination, FilmNomination, Genre, FilmGenre, Person, FilmPerson,
                //          Profession, PersonProfession],
                autoLoadModels: true,
                synchronize: true
            }),

            inject: [ConfigService],
        }),

    ],
})
export class PostgresDBModule {}