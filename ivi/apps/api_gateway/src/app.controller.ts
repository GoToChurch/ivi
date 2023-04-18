import {Body, Controller, Get, Inject, Post} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateFilmDto} from "../../film/src/dto/create_film.dto";
import {AppService} from "./app.service";
import {CreatePersonDto} from "../../film/src/dto/create_person.dto";
import {CreateProfessionDto} from "../../film/src/dto/create_profession.dto";

@Controller()
export class AppController {
  constructor(@Inject('FILM') private readonly filmService: ClientProxy,
              private appService: AppService) {}

  @Get('/films')
  async getAllFilms() {
    return this.filmService.send(
        {
          cmd: 'get-all-films',
        },
        {},
    );
  }

    @Post('/films')
    async createFilm(@Body() createFilmDto: CreateFilmDto) {
    const directors = this.appService.getDirectors();

      return this.filmService.send(
          {
            cmd: 'create-film',
          },
          {
            createFilmDto,
            directors
          },
      );
    }

    @Get('/persons')
    async getAllPersons() {
        return this.filmService.send(
            {
                cmd: 'get-all-persons',
            },
            {},
        );
    }

    @Post('/persons')
    async createPerson(@Body() createPersonDto: CreatePersonDto) {
        return this.filmService.send(
            {
                cmd: 'create-person',
            },
            {
                createPersonDto,
            },
        );
    }

    @Get('/professions')
    async getAllProfessions() {
        return this.filmService.send(
            {
                cmd: 'get-all-professions',
            },
            {},
        );
    }

    @Post('/professions')
    async createProfession(@Body() createProfessionDto: CreateProfessionDto) {
        return this.filmService.send(
            {
                cmd: 'create-profession',
            },
            {
                createProfessionDto
            },
        );
    }
}
