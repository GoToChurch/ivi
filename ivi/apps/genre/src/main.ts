import { NestFactory } from "@nestjs/core";
import { GenreModule } from "./genre.module";
import {ConfigService} from "@nestjs/config";
import {CommonService, ValidationPipe} from "@app/common";


async function bootstrap() {
  const app = await NestFactory.create(GenreModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queue = configService.get("RABBITMQ_GENRE_QUEUE");

  app.connectMicroservice(commonService.getRmqOptions(queue, true));
  await app.startAllMicroservices();
}
bootstrap();
