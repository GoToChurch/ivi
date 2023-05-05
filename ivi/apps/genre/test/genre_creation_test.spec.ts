import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import { ClientProxy } from '@nestjs/microservices';
import {CommonModule, CommonService, CreateGenreDto, FilmGenres, Genre} from '@app/common';
import {ConfigService} from "@nestjs/config";
import {lastValueFrom, Observable} from "rxjs";
import {GenreService} from "../src/genre.service";
import {getModelToken} from "@nestjs/sequelize";

describe('Film creation tests', () => {
    let app: INestApplication;
    let client: ClientProxy;
    let mockReturnGenre
    let mockCreateGenre: CreateGenreDto;
    let mockGenreModel: any;
    let mockFilmGenreModel: any;
    let genreService: GenreService;

    beforeAll(async () => {
        mockGenreModel = {
            findByPk: jest.fn(),
            create: jest.fn(),
        }

        mockFilmGenreModel = {
            findByPk: jest.fn(),
            create: jest.fn(),
        }
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                GenreService,
                {
                    provide: getModelToken(Genre),
                    useValue: mockGenreModel,
                },
                {
                    provide: getModelToken(FilmGenres),
                    useValue: mockFilmGenreModel,
                }
            ]
        }).compile();

        genreService = moduleFixture.get<GenreService>(GenreService);
    });

    beforeEach(() => {
        mockReturnGenre = {
            id: 1,
            name: "акаа",
            englishName: "Akaa"
        }

        mockCreateGenre = {
            name: "акаа",
            englishName: "Akaa"
        }
    })

    it('create film with correct params', async () => {
        mockGenreModel.findByPk.mockReturnValue(mockReturnGenre);

        const result = await genreService.createGenre(mockCreateGenre);
        expect(result).toEqual(mockReturnGenre);
    });
});
