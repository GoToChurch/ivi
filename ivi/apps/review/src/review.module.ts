import { Module } from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import {CommonModule, Film, PostgresFilmDbModule, Review} from "@app/common";


@Module({
  imports: [
    CommonModule,
    PostgresFilmDbModule,
    SequelizeModule.forFeature(
        [Film, Review]
    ),
    CommonModule.registerRmq({name: "USERS"}),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
