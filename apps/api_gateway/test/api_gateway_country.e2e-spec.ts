import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {CreateCountryDto} from "@app/common";


describe('e2e tests for country endpoints', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let token;
    let userId;
    let countryId;

    const createCountryDto: CreateCountryDto = {
        name: 'США',
        englishName: 'us'
    };

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
    });

    it('/countries (POST)', async () => {
        const countryResponse = await request(app.getHttpServer())
            .post('/countries')
            .set('Authorization', `Bearer ${token}`)
            .send(createCountryDto)
            .expect(201)

        countryId = countryResponse.body.id;

        return countryResponse;
    });

    it('/countries (GET)', async () => {
        return request(app.getHttpServer())
            .get('/countries')
            .expect(200)
    });

    it('/countries/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/countries/${countryId}`)
            .expect(200)
    });

    it('/countries/:id (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/countries/${countryId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...createCountryDto})
            .expect(200)
    });

    it('/countries/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/countries/${countryId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    afterAll(async () => {
        await request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
    })
})