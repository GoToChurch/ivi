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
import {ReviewController} from "./controllers/review.controller";
import {ReviewService} from "./services/review.service";
import {RelatedFilms} from "@app/common/models/films_models/films/related_films.model";
import {AdminService} from "./services/admin.service";
import {AdminController} from "./controllers/admin.controller";



@Module({
  imports: [
    CommonModule,
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Film, FilmDirectors, FilmEditors, FilmCinematography, FilmMusicians, FilmDesigners, FilmProducers,
          FilmWriters, FilmActors, FilmGenres, Review, RelatedFilms]
    ),
    CommonModule.registerRmq({name: 'COUNTRY'}),
    CommonModule.registerRmq({name: 'AWARD'}),
    CommonModule.registerRmq({name: 'GENRE'}),
    CommonModule.registerRmq({name: 'PERSON'}),
  ],
  controllers: [FilmController, ReviewController, AdminController],
  providers: [FilmService, ReviewService, AdminService],
})
export class FilmModule {}
