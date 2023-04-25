import {NestFactory} from '@nestjs/core';
import {AppModule} from "./app.module";
import {ConfigService} from "@nestjs/config";
import {GlobalService} from "@lib/global";
import * as session from "express-session";
import * as passport from "passport";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const globalService = app.get(GlobalService);
    const queue_1 = 'USERS'
    const queue_2 = 'AUTH'

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
    app.setGlobalPrefix('api')

    app.connectMicroservice(globalService.getRmqOptions(queue_1, true));
    app.connectMicroservice(globalService.getRmqOptions(queue_2, true));

    await app.startAllMicroservices();

    await app.listen(configService.get('AUTH_REG_PORT'),
        () => console.log(`Microservice Auth_Reg запущен на порту ${configService.get('AUTH_REG_PORT')}`));
}

bootstrap();
