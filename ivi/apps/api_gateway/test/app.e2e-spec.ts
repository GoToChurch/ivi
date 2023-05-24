import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {AppModule} from "../src/app.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', async () => {
    const user = {email: 'ivanov@mail.ru', password: '123'};
    return request(app.getHttpServer())
        .post('/auth/login')
        .send(user)
        .expect(500);
    //const {jwt} = loginResponse.body;
    //await request(app.getHttpServer())
    //        .get('/users')
    //        // use the jwt to authenticate your request
    //        .set('Authorization', 'Bearer ' + jwt)
    //        .expect(200)
    //        .expect(res => expect(res.body.users[0])
    //                .toMatchObject({ username: 'user' }));
    //})

  })


  it('/users/1 (GET)', () => {
    return request(app.getHttpServer())
        .get('/users/1')
        .expect(401);
  });

  it('/roles (GET)', () => {
    return request(app.getHttpServer())
        .get('/roles')
        .expect(403);
  });

  it('/users (POST)', async () => {
    await request(app.getHttpServer())
        .post('/users')
        .send({
          email: "ivanov@mail.ru",
          password: "123",
          first_name: "Victor",
          second_name: "Ivanov",
          phone: "89000000065",
          age: 35,
          country: "USA"
        })
        .expect(201)

  });

  it('/users/1 (DELETE)', async () => {
      await request(app.getHttpServer())
        .delete('/users/1')
        .expect(401)
  })

  it('/users/email/ivanov@gmail.com (GET)', async () => {
       await request(app.getHttpServer())
        .get('/users/email/ivanov@gmail.com')
        .expect(401)
  })

  it('/users/phone/ivanov@gmail.com (GET)', async () => {
      await request(app.getHttpServer())
        .get('/users/phone/ivanov@gmail.com')
        .expect(401)
  })
});
