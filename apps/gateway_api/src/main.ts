import { NestFactory } from '@nestjs/core';
import { GatewayApiModule } from './gateway_api.module';
import {ConfigService} from "@nestjs/config";
import * as session from "express-session";
import * as passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(GatewayApiModule);

  const configService = app.get(ConfigService);
  app.use(session({
    cookie: {
      maxAge: 60000 * 24
    },
    secret: "dadudadudaduda",
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session())
  //const globalService = app.get(GlobalService);
  //const queue = 'USERS_GATEWAY'

  //app.connectMicroservice(globalService.getRmqOptions(queue, true));

  //await app.startAllMicroservices()
  app.setGlobalPrefix('api')
  await app.listen(configService.get('API_PORT'), () => console.log(`GateWay запущен на порту ${configService.get('API_PORT')}`));
}
bootstrap();
