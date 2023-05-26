import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {AwardController} from "./award.controller";
import {AwardService} from "./award.service";
import {Award, CommonModule, Film, FilmAwards, Nomination, PostgresFilmDbModule} from "@app/common";


@Module({
    imports: [
        CommonModule,
        PostgresFilmDbModule,
        SequelizeModule.forFeature(
            [Film, Award, FilmAwards, Nomination]
        ),
    ],
    controllers: [AwardController],
    providers: [AwardService],
})
export class AwardModule {}
