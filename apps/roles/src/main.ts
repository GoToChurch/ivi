import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import {ConfigService} from "@nestjs/config";
import {GlobalService} from "@lib/global";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const globalService = app.get(GlobalService);
  const queue = 'ROLES'

  app.connectMicroservice(globalService.getRmqOptions(queue, true));
  await app.startAllMicroservices()
  await app.listen(configService.get('ROLES_PORT'),
      () => console.log(`Microservice Roles запущен на порту ${configService.get('ROLES_PORT')}`));
}
bootstrap();
