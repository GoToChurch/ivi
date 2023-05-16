import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import {CommonModule, Film, FilmGenres, Genre, PostgresFilmDbModule} from "@app/common";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
  imports: [
    CommonModule,
    PostgresFilmDbModule,
    SequelizeModule.forFeature(
        [Film, Genre, FilmGenres]
    ),
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
