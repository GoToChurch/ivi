import { Module } from '@nestjs/common';
import { PersonController } from './controllers/person.controller';
import {ProfessionController} from "./controllers/profession.controller";
import { PersonService } from './services/person.service';
import {ProfessionService} from "./services/profession.service";
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
  controllers: [PersonController, ProfessionController],
  providers: [PersonService, ProfessionService],
})
export class PersonModule {}
