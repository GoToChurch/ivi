import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {AddAwardDto, AddCountryDto, AddGenreDto, AddPersonDto, CreateFilmDto} from "@app/common";


describe('e2e tests for film endpoints', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let token;
    let userId;
    let filmId;
    let personId;
    let awardId;
    let genreId;
    let countryId;

    const mockFilm: CreateFilmDto = {
        name: "Scarface",
        originalName: "Scarface",
        poster: "poster",
        trailer: "trailer",
        mpaaRating: "16+",
        rating: 2,
        ratingsNumber: 3,
        year: 1983,
        duration: 170,
        description: "the best of the best",
    }

    const mockUser = {
        email: "Admin@gmail.com",
        password: "admin",
        first_name: "Admin",
        second_name: "Adminov",
        phone: "89000055066",
        age: 35,
        country: "USA",
        role: "ADMIN"
    };

    const mockPerson: AddPersonDto = {
        name: 'Тест',
        originalName: 'Lesly',
        photo: 'photo'
    };

    const mockGenre: AddGenreDto = {
        name: 'тест'
    };

    const mockCountry: AddCountryDto = {
        name: 'Тест',
        englishName: 'ts'
    };

    const mockAward: AddAwardDto = {
        name: 'Тест',
        year: 2019,
        nominations: []
    };

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
                JwtModule.registerAsync({
                    useFactory: (configService: ConfigService) => ({
                        secret: configService.get("JWT_SECRET"),
                        signOptions: {
                            expiresIn: "24h"
                        },
                    }),
                    inject: [ConfigService],
                }),
            ],
        }).compile();
        jwtService = moduleFixture.get<JwtService>(JwtService);
        app = moduleFixture.createNestApplication();
        await app.init();

        const registrtionResponse = await request(app.getHttpServer())
            .post('/users/')
            .send(mockUser)
            .expect(201)

        userId = registrtionResponse.body.id;

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: mockUser.email,
                password: mockUser.password
            })
            .expect(201)

        token = loginResponse.body.accessToken;

        const personResponse = await request(app.getHttpServer())
            .post('/persons')
            .set('Authorization', `Bearer ${token}`)
            .send(mockPerson)
            .expect(201)

        personId = personResponse.body.id;

        const award = await request(app.getHttpServer())
            .post('/awards')
            .set('Authorization', `Bearer ${token}`)
            .send(mockAward)
            .expect(201)

        awardId = award.body.id;

        const genreResponse = await request(app.getHttpServer())
            .post('/genres')
            .set('Authorization', `Bearer ${token}`)
            .send({...mockGenre, englishName: "test"})
            .expect(201)

        genreId = genreResponse.body.id;

        const countryResponse = await request(app.getHttpServer())
            .post('/countries')
            .set('Authorization', `Bearer ${token}`)
            .send(mockCountry)
            .expect(201)

        countryId = countryResponse.body.id;
    });

    it('/films (POST)', async () => {
        const filmResponse = await request(app.getHttpServer())
            .post('/films')
            .set('Authorization', `Bearer ${token}`)
            .send(mockFilm)
            .expect(201)

        filmId = filmResponse.body.id;
    });

    it('/films (GET)', async () => {
        return request(app.getHttpServer())
            .get('/films')
            .expect(200)
    });

    it('/films/filter/:filter1 (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/films/filter/${mockFilm.year}`)
            .expect(200)
    });

    it('/films/filter/:filter1/:filter2 (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/films/filter/boevik/${mockFilm.year}`)
            .expect(200)
    });

    it('/films/filter/:filter1/:filter2/:filter3 (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/films/filter/boevik/${mockFilm.year}/USA`)
            .expect(200)
    });

    it('/films/:name (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/films/name/${mockFilm.name}`)
            .expect(200)
    });

    it('/films/:id (GET)', async () => {
        const film = await request(app.getHttpServer())
            .get(`/films/name/${mockFilm.name}`)
            .expect(200)
        return request(app.getHttpServer())
            .get(`/films/${film.body[0].id}`)
            .expect(200)
    });

    it('/films/:id (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/films/${filmId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({name: mockFilm.name})
            .expect(200)

    });

    it('/films/:id/add/director (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/films/${filmId}/add/director`)
            .set('Authorization', `Bearer ${token}`)
            .send(mockPerson)
            .expect(201)
    });

    it('/films/:id/add/writer (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/films/${filmId}/add/writer`)
            .set('Authorization', `Bearer ${token}`)
            .send(mockPerson)
            .expect(201)
    });

    it('/films/:id/add/producer (POST)', async () => {
       return request(app.getHttpServer())
           .post(`/films/${filmId}/add/producer`)
           .set('Authorization', `Bearer ${token}`)
           .send(mockPerson)
           .expect(201)
    });

    it('/films/:id/add/cinematography (POST)', async () => {
       return request(app.getHttpServer())
           .post(`/films/${filmId}/add/cinematography`)
           .set('Authorization', `Bearer ${token}`)
           .send(mockPerson)
           .expect(201)
    });

    it('/films/:id/add/musician (POST)', async () => {
       return request(app.getHttpServer())
           .post(`/films/${filmId}/add/musician`)
           .set('Authorization', `Bearer ${token}`)
           .send(mockPerson)
           .expect(201)
    });

    it('/films/:id/add/designer (POST)', async () => {
       return request(app.getHttpServer())
           .post(`/films/${filmId}/add/designer`)
           .set('Authorization', `Bearer ${token}`)
           .send(mockPerson)
           .expect(201)
    });

    it('/films/:id/add/editor (POST)', async () => {
       return request(app.getHttpServer())
           .post(`/films/${filmId}/add/editor`)
           .set('Authorization', `Bearer ${token}`)
           .send(mockPerson)
           .expect(201)
    });

    it('/films/:id/add/genre (POST)', async () => {
       return request(app.getHttpServer())
           .post(`/films/${filmId}/add/genre`)
           .set('Authorization', `Bearer ${token}`)
           .send(mockGenre)
           .expect(201)
    });

    it('/films/:id/add/country (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/films/${filmId}/add/country`)
            .set('Authorization', `Bearer ${token}`)
            .send(mockCountry)
            .expect(201)
    });

    it('/films/:id/add/award (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/films/${filmId}/add/award`)
            .set('Authorization', `Bearer ${token}`)
            .send(mockAward)
            .expect(201)
    });

    it('/films/:id/add/relatedFilm (POST)', async () => {
        const mockRelatedFilm: CreateFilmDto = {
            name: "KOko",
            originalName: "relatedFilm",
            poster: "poster",
            trailer: "trailer",
            mpaaRating: "16+",
            rating: 2,
            ratingsNumber: 3,
            year: 1983,
            duration: 170,
            description: "the best of the best",
        }
        await request(app.getHttpServer())
            .post('/films')
            .set('Authorization', `Bearer ${token}`)
            .send(mockRelatedFilm)
            .expect(201)

        const film = await request(app.getHttpServer())
            .get(`/films/name/${mockFilm.name}`)
            .expect(200)

        const relatedFilm = await request(app.getHttpServer())
            .get(`/films/name/${mockRelatedFilm.name}`)
            .expect(200)

        const relatedFilmId = relatedFilm.body[0].id;

        await request(app.getHttpServer())
            .post(`/films/${filmId}/add/relatedFilm`)
            .set('Authorization', `Bearer ${token}`)
            .send({id: relatedFilmId})
            .expect(201)

        await request(app.getHttpServer())
            .delete(`/films/${relatedFilmId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('/films/:id/persons (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/films/${filmId}/persons `)
            .expect(200)
    });

    it('/films/:id (DELETE)', async () => {
        await request(app.getHttpServer())
            .delete(`/films/${filmId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    afterAll(async () => {
        await request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)

        await request(app.getHttpServer())
            .delete(`/awards/${awardId}`)
            .set('Authorization', `Bearer ${token}`)

        await request(app.getHttpServer())
            .delete(`/countries/${countryId}`)
            .set('Authorization', `Bearer ${token}`)

        await request(app.getHttpServer())
            .delete(`/person/${personId}`)
            .set('Authorization', `Bearer ${token}`)

        await request(app.getHttpServer())
            .delete(`/genres/${genreId}`)
            .set('Authorization', `Bearer ${token}`)
    })
})