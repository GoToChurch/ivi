import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


describe('e2e tests for auth endpoints', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let userId;
    let token;

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
    });

    it('/auth/login (POST)', async () => {
        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send({
                email: mockUser.email,
                password: mockUser.password
            })
            .expect(201)

        token = loginResponse.body.accessToken;

        return loginResponse;
    });

    it('/auth/logout (GET)', async () => {
       const loginResponse = await request(app.getHttpServer())
           .post('/auth/login')
           .send({
               email: mockUser.email,
               password: mockUser.password
           })
           .expect(201)

        token = loginResponse.body.accessToken;
       return request(app.getHttpServer())
           .get('/auth/logout')
           .set('Authorization', `Bearer ${token}`)
           .send(loginResponse.headers)
           .expect(200)
    })

    afterAll(async () => {
        await request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
    })
})
