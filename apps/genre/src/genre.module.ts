import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import {CommonModule, Film, FilmGenres, Genre, PostgresDBModule} from "@app/common";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
  imports: [
    CommonModule,
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Film, Genre, FilmGenres]
    ),
  ],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
