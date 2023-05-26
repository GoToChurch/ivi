import {NestFactory} from '@nestjs/core';
import {AppAuthModule} from "./app.auth.module";
import {ConfigService} from "@nestjs/config";
import {CommonService, ValidationPipe} from "@app/common";
import * as session from "express-session";
import * as passport from "passport";


async function bootstrap() {
    const app = await NestFactory.create(AppAuthModule);
    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api")

    app.use(session({
        cookie: {
            maxAge: 60000 * 24
        },
        name: "My_Session",
        secret: "dadudadudaduda",
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session())

    const configService = app.get(ConfigService);
    const commonService = app.get(CommonService);

    const usersQueue = configService.get("RABBITMQ_USERS_QUEUE"); //'USERS'
    const authQueue = configService.get("RABBITMQ_AUTH_QUEUE");//'AUTH'

    app.connectMicroservice(commonService.getRmqOptions(usersQueue, true));
    app.connectMicroservice(commonService.getRmqOptions(authQueue, true));

    await app.startAllMicroservices();

    await app.listen(configService.get("AUTH_REG_PORT"),
        () => console.log(`Microservice Auth_Reg запущен на порту ${configService.get('AUTH_REG_PORT')}`));
}

bootstrap();
