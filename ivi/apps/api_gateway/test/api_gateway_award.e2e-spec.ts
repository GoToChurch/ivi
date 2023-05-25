import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {CreateAwardDto, CreateNominationDto} from "@app/common";


describe('e2e tests for award and nominations endpoints', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let token;
    let userId;
    let awardId;
    let nominationId;

    const createAwardDto: CreateAwardDto = {
        name: 'Oscar',
        year: 2000
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

    const createNominationDto: CreateNominationDto = {
        name: 'someNomination'
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

    it('/awards (POST)', async () => {
        const award = await request(app.getHttpServer())
            .post('/awards')
            .set('Authorization', `Bearer ${token}`)
            .send(createAwardDto)
            .expect(201)

        awardId = award.body.id;

        return award;
    });

    it('/awards (GET)', async () => {
        return request(app.getHttpServer())
            .get('/awards')
            .expect(200)
    });

    it('/awards/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/awards/${awardId}`)
            .expect(200)
    });

    it('/awards/:id (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/awards/${awardId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...createAwardDto})
            .expect(200)
    });

    it('/awards/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/awards/${awardId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('/nominations (POST)', async () => {
        const nomination = await request(app.getHttpServer())
            .post('/nominations')
            .set('Authorization', `Bearer ${token}`)
            .send(createNominationDto)
            .expect(201)

        nominationId = nomination.body.id;
    });

    it('/nominations (GET)', async () => {
        return request(app.getHttpServer())
            .get('/nominations')
            .expect(200)
    });

    it('/nominations/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/nominations/${nominationId}`)
            .expect(200)
    });

    it('/nominations/:id (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/nominations/${nominationId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...createNominationDto})
            .expect(200)
    });

    it('/nominations/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/nominations/${nominationId}`)
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
