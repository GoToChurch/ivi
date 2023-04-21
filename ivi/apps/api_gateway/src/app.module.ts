import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {CommonModule} from "@app/common";
import {AppService} from "./app.service";


@Module({
  imports: [
    CommonModule.registerRmq({name: 'FILM'}),
    CommonModule.registerRmq({name: 'COUNTRY'}),
    CommonModule.registerRmq({name: 'AWARD'}),
    CommonModule.registerRmq({name: 'GENRE'}),
    CommonModule.registerRmq({name: 'PERSON'}),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
