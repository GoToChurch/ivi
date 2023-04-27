import { Module } from '@nestjs/common';
import {CommonModule} from "@app/common";
import {AppService} from "./app.service";
import {AppFilmsController} from "./controllers/app_films.controller";
import {AppAwardsController} from "./controllers/app_awards.controller";
import {AppCountriesController} from "./controllers/app_countries.controller";
import {AppGenresController} from "./controllers/app_genres.controller";
import {AppPersonsController} from "./controllers/app_persons.controller";
import {AppController} from "./app.controller";


@Module({
  imports: [
    CommonModule.registerRmq({name: 'FILM'}),
    CommonModule.registerRmq({name: 'COUNTRY'}),
    CommonModule.registerRmq({name: 'AWARD'}),
    CommonModule.registerRmq({name: 'GENRE'}),
    CommonModule.registerRmq({name: 'PERSON'}),
  ],
  controllers: [AppFilmsController, AppAwardsController, AppCountriesController, AppGenresController, AppPersonsController, AppController],
  providers: [AppService]
})
export class AppModule {}
