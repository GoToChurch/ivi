import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {
  CommonModule,
  Film,
  Person,
  PersonFilms,
  PersonProfessions,
  PostgresFilmDbModule,
  Profession
} from "@app/common";


@Module({
  imports: [
    CommonModule,
    CommonModule.registerRmq({name: "FILM"}),
    PostgresFilmDbModule,
    SequelizeModule.forFeature(
        [Film, Person, PersonFilms, Profession, PersonProfessions]
    ),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
