import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import {CommonModule, Country, Film, FilmCountries, PostgresDBModule,} from "@app/common";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
  imports: [
    CommonModule,
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Film, Country, FilmCountries]
    ),
  ],
  controllers: [CountryController],
  providers: [CountryService],
})
export class CountryModule {}
