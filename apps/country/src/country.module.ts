import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { CountryController } from "./country.controller";
import { CountryService } from "./country.service";
import {CommonModule, Country, Film, FilmCountries, PostgresFilmDbModule,} from "@app/common";


@Module({
    imports: [
        CommonModule,
        PostgresFilmDbModule,
        SequelizeModule.forFeature(
            [Film, Country, FilmCountries]
        ),
    ],
    controllers: [CountryController],
    providers: [CountryService],
})
export class CountryModule {}
