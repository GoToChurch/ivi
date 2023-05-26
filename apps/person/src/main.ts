import { NestFactory } from '@nestjs/core';
import { PersonModule } from './person.module';
import {ConfigService} from "@nestjs/config";
import {CommonService, ValidationPipe} from "@app/common";


async function bootstrap() {
  const app = await NestFactory.create(PersonModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queue = configService.get("RABBITMQ_PERSON_QUEUE");

  app.connectMicroservice(commonService.getRmqOptions(queue, true));
  await app.startAllMicroservices();
}
bootstrap();
