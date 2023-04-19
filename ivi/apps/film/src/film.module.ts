import {forwardRef, Module} from '@nestjs/common';
import { FilmController } from './controllers/film.controller';
import { FilmService } from './services/film.service';
import {CommonModule, PostgresDBModule} from "@app/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Award} from "./models/awards/awards.model";
import {AwardNominations} from "./models/awards/award_nominations.models";
import {FilmAwards} from "./models/awards/film_awards.model";
import {Film} from "./models/films_models/films/films.model";
import {FilmDirectors} from "./models/films_models/films/film_directors.models";
import {FilmEditors} from "./models/films_models/films/film_editors.model";
import {FilmCinematography} from "./models/films_models/films/film_cinematography.model";
import {FilmMusicians} from "./models/films_models/films/film_musicians.model";
import {FilmDesigners} from "./models/films_models/films/film_designers.model";
import {FilmProducers} from "./models/films_models/films/film_producers.model";
import {FilmWriters} from "./models/films_models/films/film_writers.model";
import {FilmActors} from "./models/films_models/films/film_actors.model";
import {FilmGenres} from "./models/genre_models/film_genres.model";
import {Nomination} from "./models/awards/nominations.model";
import {Review} from "./models/films_models/reviews/reviews.model";
import {Genre} from "./models/genre_models/genre.model";
import {Person} from "./models/persons_models/persons.model";
import {Profession} from "./models/persons_models/professions.model";
import {PersonFilms} from "./models/persons_models/person_films.model";
import {PersonProfessions} from "./models/persons_models/person_professions.model";
import {PersonService} from "./services/person.service";
import {AwardService} from "./services/award.service";
import {GenreService} from "./services/genre.service";
import {PersonController} from "./controllers/person.controller";
import {Country} from "./models/countries/country.model";
import {FilmCountries} from "./models/countries/film_country.model";
import {AwardController} from "./controllers/award.controller";
import {GenreController} from "./controllers/genre.controller";
import {CountryService} from "./services/country.service";

@Module({
  imports: [
    CommonModule,
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Award, AwardNominations, FilmAwards, Film, FilmDirectors, FilmEditors,
    FilmCinematography, FilmMusicians, FilmDesigners, FilmProducers, FilmWriters, FilmActors, FilmGenres,
    Nomination, Review, Genre, Person, Profession, PersonFilms, PersonProfessions, Country, FilmCountries]
    ),
  ],
  controllers: [FilmController, PersonController, AwardController, GenreController],
  providers: [FilmService, PersonService, AwardService, GenreService, CountryService],
})
export class FilmModule {}
