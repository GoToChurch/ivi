import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


describe('e2e tests for users endpoints', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let token;
    let userId;

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
    });


    it('/users (POST)', async () => {
        const registrtionResponse = await request(app.getHttpServer())
            .post('/users/')
            .send(mockUser)
            .expect(201)

        userId = registrtionResponse.body.id;
    })

    it(`/users/:id (GET)`, async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .expect(200)
    });

    it('/users/email/:email (GET)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .get(`/users/email/${mockUser.email}`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .expect(200)
    })

    it('/users/phone/:phone (GET)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .get(`/users/phone/${mockUser.phone}`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .expect(200)
    })

    it('/users/filter/:param1/:param2(GET)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .get(`/users/filter/${mockUser.age}/${mockUser.country}`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .expect(200)
    })

    it('/users/filter/param (GET)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .get(`/users/filter/${mockUser.age}`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .expect(200)
    })

    it('/users/:id (PUT)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .put(`/users/${userId}`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .send({...mockUser, first_name: 'Sergey'})
            .expect(200)
    });

    it('/users/role/:role (GET)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .get(`/users/role/ADMIN`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .expect(200)
    });

    it('/users/role/add (POST)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .post(`/users/role/add`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .send({userId, value: 'USER'})
            .expect(201)
    });

    it('/users/role/delete (POST)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .post(`/users/role/delete`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .send({userId, value: 'USER'})
            .expect(201)
    });

    it('/users/:id/reviews (GET)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .get(`/users/${userId}/reviews`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .expect(200)
    });

    it(`/users/:id (DELETE)`, async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)
        return request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
            .expect(200)
    });
});