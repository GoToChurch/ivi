import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import {ConfigService} from "@nestjs/config";
import {CommonService, ValidationPipe} from "@app/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const globalService = app.get(CommonService);
  const queue = configService.get("RABBITMQ_ROLES_QUEUE");

  app.connectMicroservice(globalService.getRmqOptions(queue, true));
  await app.startAllMicroservices()
  await app.listen(configService.get("ROLES_PORT"),
      () => console.log(`Microservice Roles запущен на порту ${configService.get('ROLES_PORT')}`));
}
bootstrap();
