import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigService} from "@nestjs/config";
import {
  Award,
  AwardNominations, CommonModule, CommonService, Country, CreateFilmDto,
  Film,
  FilmActors,
  FilmAwards,
  FilmCinematography, FilmCountries,
  FilmDesigners,
  FilmDirectors,
  FilmEditors,
  FilmGenres,
  FilmMusicians,
  FilmProducers,
  FilmWriters,
  Genre,
  Nomination,
  Person,
  PersonFilms,
  PersonProfessions,
  Profession,
  Review
} from "@app/common";
import {RelatedFilms} from "@app/common/models/films_models/films/related_films.model";
import {ClientProxy} from "@nestjs/microservices";
import {Observable} from "rxjs";

describe('Film test', () => {
  let app: INestApplication;
  let client: ClientProxy;
  let mockFilm: CreateFilmDto;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          useFactory: (configService: ConfigService) => ({
            dialect: 'postgres',
            host: configService.get('POSTGRES_HOST'),
            port: +configService.get('POSTGRES_PORT'),
            username: configService.get('POSTGRES_USER'),
            password: configService.get('POSTGRES_PASSWORD'),
            database: configService.get('POSTGRES_DB_TEST'),
            models: [Award, AwardNominations, FilmAwards, Film, FilmDirectors, FilmEditors,
              FilmCinematography, FilmMusicians, FilmDesigners, FilmProducers, FilmWriters, FilmActors, FilmGenres,
              Nomination, Review, Genre, Person, Profession, PersonFilms, PersonProfessions, Country, FilmCountries, RelatedFilms],
            autoLoadModels: true,
            synchronize: true
          }),

          inject: [ConfigService],
        }),
        CommonModule.registerRmq({name: 'FILM'}),
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    const configService = app.get(ConfigService);
    const commonService = app.get(CommonService);

    await app.init();

    client = app.get('FILM');
    await client.connect();

    mockFilm = {
      description: "Film category B",
      duration: 90,
      mpaaRating: "18+",
      name: "Бойня",
      originalName: "SlaughterHouse",
      poster: "http://slaughterhouse.com/film/poster",
      rating: 1.7,
      ratingsNumber: 100,
      trailer: "http://slaughterhouse.com/film/trailer",
      year: 2023
    }
  });

  it('createFilm', done => {
    const response: Observable<any> = client.send(
        { cmd: 'create-film' },
        { createFilmDto: mockFilm },
    );

    response.subscribe(json => {
      console.log(json)

      done();
    });
  });
});
