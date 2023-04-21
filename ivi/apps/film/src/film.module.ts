import {Module} from '@nestjs/common';
import { FilmController } from './controllers/film.controller';
import { FilmService } from './services/film.service';
import {
  CommonModule,
  Film, FilmActors,
  FilmCinematography, FilmDesigners,
  FilmDirectors,
  FilmEditors, FilmGenres,
  FilmMusicians, FilmProducers, FilmWriters,
  PostgresDBModule, Review
} from "@app/common";
import {SequelizeModule} from "@nestjs/sequelize";



@Module({
  imports: [
    CommonModule,
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Film, FilmDirectors, FilmEditors, FilmCinematography, FilmMusicians, FilmDesigners, FilmProducers,
          FilmWriters, FilmActors, FilmGenres, Review]
    ),
    CommonModule.registerRmq({name: 'COUNTRY'}),
    CommonModule.registerRmq({name: 'AWARD'}),
    CommonModule.registerRmq({name: 'GENRE'}),
    CommonModule.registerRmq({name: 'PERSON'}),
  ],
  controllers: [FilmController],
  providers: [FilmService],
})
export class FilmModule {}
