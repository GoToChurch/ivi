import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import {CommonModule, Country, Film, FilmCountries, PostgresDBModule,} from "@app/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

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
