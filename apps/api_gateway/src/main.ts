import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {ConfigService} from '@nestjs/config'
import * as passport from "passport";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as session from "express-session";
import {ValidationPipe} from "@app/common";


async function bootstrap() {
    const app = await NestFactory.create(AppModule, {cors: true});
    const configService = app.get(ConfigService);

    app.useGlobalPipes(new ValidationPipe());
    app.setGlobalPrefix("api");

    app.use(session({
        cookie: {
            maxAge: 60000 * 24
        },
        secret: "supersecret",
        resave: false,
        saveUninitialized: false
    }));

    app.use(passport.initialize());
    app.use(passport.session())

    const options = new DocumentBuilder()
        .setTitle("Api Documentation")
        .setDescription("Документация по api")
        .setVersion("1.0")
        .addTag("api")
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("api/docs", app, document);

    await app.listen(configService.get('API_PORT'), () =>
        console.log(`GateWay запущен на порту ${configService.get('API_PORT')}`));
}

bootstrap();