import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {CreateReviewDto} from "@app/common";


describe('AppController (e2e)', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let token;
    let filmId;
    let reviewId;
    let userId;

    const createReviewDto: CreateReviewDto = {
        title: 'comment',
        text: 'bad comment'
    };

    const mockUser = {
        email: 'Neil@gmail.com',
        password: 'password'
    };

    const mockFilm = {
        name: "Переполох в Общаге",
        originalName: "Obchaga",
        trailer: "trailer,ru",
        poster: "постер.рф",
        mpaaRating: "18+",
        rating: 2.2,
        ratingsNumber: 1223,
        year: 2023,
        country: "USA",
        duration: 90,
        description: "movie"
    }

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

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)

        token = loginResponse.body.accessToken;

        const userResponse = await request(app.getHttpServer())
            .get(`/users/email/${mockUser.email}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        userId = userResponse.body.id;

        const filmResponse = await request(app.getHttpServer())
            .post('/films/')
            .set('Authorization', `Bearer ${token}`)
            .send(mockFilm)
            .expect(201)

        filmId = filmResponse.body.id;
    });

    it('/films/:filmId (POST)', async () => {
        const review = await request(app.getHttpServer())
            .post(`/films/${filmId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...createReviewDto, filmId, userId})
            .expect(201)

        reviewId = review.body.id;

        return review;
    });

    it('/reviews (GET)', async () => {
        return request(app.getHttpServer())
            .get('/reviews')
            .expect(200)
    });

    it('/reviews/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/reviews/${reviewId}`)
            .expect(200)
    });

    it('/reviews/:id (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/reviews/${reviewId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...createReviewDto})
            .expect(200)
    });

    it('/films/:filmId/review/:parentId (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/films/${filmId}/review/${reviewId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...createReviewDto, filmId, userId, parentId: reviewId})
            .expect(201)
    });

    it('/reviews/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/reviews/${reviewId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    afterAll(async () => {
        return request(app.getHttpServer())
            .delete(`/films/${filmId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
    })
})