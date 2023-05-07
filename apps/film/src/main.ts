import { NestFactory } from '@nestjs/core';
import {CommonService} from "@app/common";
import {ConfigService} from "@nestjs/config";
import {FilmModule} from "./film.module";

async function bootstrap() {
  const app = await NestFactory.create(FilmModule);

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queue1 = configService.get('RABBITMQ_FILM_QUEUE');
  const queue2 = configService.get('RABBITMQ_REVIEWS_QUEUE');

  app.connectMicroservice(commonService.getRmqOptions(queue1, true));
  app.connectMicroservice(commonService.getRmqOptions(queue2, true));
  await app.startAllMicroservices();
  await app.listen(3004, () =>
      console.log(`Films запущен на порту ${3004}`));
}
bootstrap();
