import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config'
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
      .setTitle('Api Films Documentation')
      .setDescription('Документация по api фильмам')
      .setVersion('1.0')
      .addTag('api')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/films/docs', app, document);

  await app.listen(configService.get('API_PORT'));
}
bootstrap();