import { NestFactory } from '@nestjs/core';
import {CommonService} from "@app/common";
import {ConfigService} from "@nestjs/config";
import {FilmModule} from "./film.module";

async function bootstrap() {
  const app = await NestFactory.create(FilmModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queue = configService.get('RABBITMQ_FILM_QUEUE');

  app.connectMicroservice(commonService.getRmqOptions(queue, true));
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
