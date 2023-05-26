import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import {CreateRoleDto} from "@app/common";


describe('AppController (e2e)', () => {
    let app: INestApplication;
    let jwtService: JwtService;
    let token;
    let roleId;

    const createRoleDto: CreateRoleDto = {
        value: 'STAFF',
        description: 'Персонал'
    };

    const mockUser = {
        email: 'Neil@gmail.com',
        password: 'password'
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

        const loginResponse = await request(app.getHttpServer())
            .post('/auth/login')
            .send(mockUser)
            .expect(201)

        token = loginResponse.body.accessToken;
    });

    it('/roles (POST)', async () => {
        const role = await request(app.getHttpServer())
            .post('/roles')
            .set('Authorization', `Bearer ${token}`)
            .send(createRoleDto)
            .expect(201)

        roleId = role.body.id;

        return role;
    });

    it('/roles (GET)', async () => {
        return request(app.getHttpServer())
            .get('/roles')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('/roles/:id (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/roles/${roleId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('/roles/value/:value (GET)', async () => {
        return request(app.getHttpServer())
            .get(`/roles/value/${createRoleDto.value}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    it('/roles/:id (PUT)', async () => {
        return request(app.getHttpServer())
            .put(`/roles/${roleId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({...createRoleDto})
            .expect(200)
    });

    it('/roles/:id (DELETE)', async () => {
        return request(app.getHttpServer())
            .delete(`/roles/${roleId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    });

    afterAll(async () => {
        return request(app.getHttpServer())
            .get('/auth/logout')
            .expect(201)
    })
})