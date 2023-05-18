import { NestFactory } from '@nestjs/core';
import {CommonService, ValidationPipe} from "@app/common";
import {ConfigService} from "@nestjs/config";
import {CountryModule} from "./country.module";


async function bootstrap() {
  const app = await NestFactory.create(CountryModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queue = configService.get("RABBITMQ_COUNTRY_QUEUE");

  app.connectMicroservice(commonService.getRmqOptions(queue, true));
  await app.startAllMicroservices();
}
bootstrap();
