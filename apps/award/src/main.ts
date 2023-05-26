import { NestFactory } from "@nestjs/core";
import {ConfigService} from "@nestjs/config";
import {CommonService, ValidationPipe} from "@app/common";
import {AwardModule} from "./award.module";


async function bootstrap() {
  const app = await NestFactory.create(AwardModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const commonService = app.get(CommonService);

  const queue = configService.get("RABBITMQ_AWARD_QUEUE");
  app.connectMicroservice(commonService.getRmqOptions(queue, true));
  await app.startAllMicroservices();
}
bootstrap();
