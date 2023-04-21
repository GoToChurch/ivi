import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import {
  CommonModule,
  Film,
  Person,
  PersonFilms,
  PersonProfessions,
  PostgresDBModule,
  Profession
} from "@app/common";
import {SequelizeModule} from "@nestjs/sequelize";


@Module({
  imports: [
    CommonModule,
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Film, Person, PersonFilms, Profession, PersonProfessions]
    ),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
