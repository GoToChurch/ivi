import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {AwardController} from "./award.controller";
import {AwardService} from "./award.service";

import {Award, CommonModule, Film, FilmAwards, Nomination, PostgresDBModule} from "@app/common";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


@Module({
  imports: [
    CommonModule,
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Film, Award, FilmAwards, Nomination]
    ),
  ],
  controllers: [AwardController],
  providers: [AwardService],
})
export class AwardModule {}
