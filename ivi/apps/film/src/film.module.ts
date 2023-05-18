import {Module} from '@nestjs/common';
import { FilmController } from './controllers/film.controller';
import { FilmService } from './services/film.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {AdminService} from "./services/admin.service";
import {AdminController} from "./controllers/admin.controller";
import {
  CommonModule,
  Film, FilmActors,
  FilmCinematography, FilmDesigners,
  FilmDirectors,
  FilmEditors, FilmGenres,
  FilmMusicians, FilmProducers, FilmWriters,
  PostgresFilmDbModule, RelatedFilms, Review
} from "@app/common";


@Module({
  imports: [
    CommonModule,
    PostgresFilmDbModule,
    SequelizeModule.forFeature(
        [Film, FilmDirectors, FilmEditors, FilmCinematography, FilmMusicians, FilmDesigners, FilmProducers,
          FilmWriters, FilmActors, FilmGenres, Review, RelatedFilms]
    ),
    CommonModule.registerRmq({name: "COUNTRY"}),
    CommonModule.registerRmq({name: "AWARD"}),
    CommonModule.registerRmq({name: "GENRE"}),
    CommonModule.registerRmq({name: "PERSON"}),
  ],
  controllers: [FilmController, AdminController],
  providers: [FilmService, AdminService],
})
export class FilmModule {}
