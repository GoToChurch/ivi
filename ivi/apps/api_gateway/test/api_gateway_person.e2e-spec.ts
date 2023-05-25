import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {CreatePersonDto, CreateProfessionDto} from "@app/common";


describe('e2e tests for person and professions endpoints', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let token;
    let userId;
    let personId;
    let professionId;

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

    const mockPerson: CreatePersonDto = {
        name: 'Arnold',
        originalName: 'Arnold',
        photo: 'photo'
    }

    const mockProfession: CreateProfessionDto = {
        name: 'Водонос'
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

    it('/persons (POST)', async () => {
        const personResponse = await request(app.getHttpServer())
            .post('/persons')
            .set('Authorization', `Bearer ${token}`)
            .send(mockPerson)
            .expect(201)

        personId = personResponse.body.id;
    });

    it('/persons (GET)', async () => {
        return request(app.getHttpServer())
            .get('/persons')
            .expect(200)
    });

    it('/person/:id (GET)' , async () => {
        return request(app.getHttpServer())
            .get(`/person/${personId}`)
            .expect(200)
    });

    it('/person/:id (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/person/${personId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...mockPerson})
            .expect(200)
    });

    it('/persons/search (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/persons/search`)
            .expect(200)
    });

    it('/person/:id/films (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/person/${personId}/films`)
            .expect(200)
    });

    it('/professions (POST)', async () => {
        const professionResponse = await request(app.getHttpServer())
            .post('/professions')
            .set('Authorization', `Bearer ${token}`)
            .send(mockProfession)
            .expect(201)

        professionId = professionResponse.body.id;
    });

    it('/person/:id/professions (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/person/${personId}/professions`)
            .expect(200)
    });

    it('/person/:id/films/:professionId (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/person/${personId}/films/${professionId}`)
            .expect(200)
    });

    it('/person/:id/add/profession (POST)', async () => {
        return request(app.getHttpServer())
            .post(`/person/${personId}/add/profession`)
            .set('Authorization', `Bearer ${token}`)
            .send(mockProfession)
            .expect(201)
    });

    it('/professions (GET)', async () => {
        return request(app.getHttpServer())
            .get('/professions')
            .expect(200)
    });

    it('/professions/:id (GET)' , async () => {
        return request(app.getHttpServer())
            .get(`/professions/${professionId}`)
            .expect(200)
    });

    it('/professions/:id (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/professions/${professionId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...mockProfession, name: 'Хлопушечник'})
            .expect(200)
    });

    it('/professions/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/professions/${professionId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('/person/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/person/${personId}`)
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
