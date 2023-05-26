import {Module} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {Award} from "@app/common/models/award_models/awards.model";
import {AwardNominations} from "@app/common/models/award_models/award_nominations.model";
import {FilmAwards} from "@app/common/models/award_models/film_awards.model";
import {Film} from "@app/common/models/films_models/films/films.model";
import {FilmDirectors} from "@app/common/models/films_models/films/film_directors.model";
import {FilmEditors} from "@app/common/models/films_models/films/film_editors.model";
import {FilmCinematography} from "@app/common/models/films_models/films/film_cinematography.model";
import {FilmMusicians} from "@app/common/models/films_models/films/film_musicians.model";
import {FilmDesigners} from "@app/common/models/films_models/films/film_designers.model";
import {FilmProducers} from "@app/common/models/films_models/films/film_producers.model";
import {FilmWriters} from "@app/common/models/films_models/films/film_writers.model";
import {FilmActors} from "@app/common/models/films_models/films/film_actors.model";
import {FilmGenres} from "@app/common/models/genre_models/film_genres.model";
import {Nomination} from "@app/common/models/award_models/nominations.model";
import {Review} from "@app/common/models/review_models/reviews.model";
import {Genre} from "@app/common/models/genre_models/genre.model";
import {Person} from "@app/common/models/persons_models/persons.model";
import {Profession} from "@app/common/models/persons_models/professions.model";
import {PersonFilms} from "@app/common/models/persons_models/person_films.model";
import {PersonProfessions} from "@app/common/models/persons_models/person_professions.model";
import {Country} from "@app/common/models/country_models/country.model";
import {FilmCountries} from "@app/common/models/country_models/film_country.model";
import {RelatedFilms} from "@app/common/models/films_models/films/related_films.model";


@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                dialect: "postgres",
                name: "film_ivi",
                host: configService.get("POSTGRES_HOST"),
                port: +configService.get("POSTGRES_PORT"),
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_FILM_DB"),
                models: [Award, AwardNominations, FilmAwards, Film, FilmDirectors, FilmEditors,
                    FilmCinematography, FilmMusicians, FilmDesigners, FilmProducers, FilmWriters, FilmActors, FilmGenres,
                    Nomination, Review, Genre, Person, Profession, PersonFilms, PersonProfessions, Country, FilmCountries,
                    RelatedFilms],
                autoLoadModels: true,
                synchronize: true
            }),
            inject: [ConfigService],
        }),
    ],
})
export class PostgresFilmDbModule {}