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
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


@Module({
  imports: [
    CommonModule,
    CommonModule.registerRmq({name: 'FILM'}),
    PostgresDBModule,
    SequelizeModule.forFeature(
        [Film, Person, PersonFilms, Profession, PersonProfessions]
    ),
  ],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
