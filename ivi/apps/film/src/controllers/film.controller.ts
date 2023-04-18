import { Controller, Get } from '@nestjs/common';
import { FilmService } from '../services/film.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CommonService} from "@app/common";
import {CreateFilmDto} from "../dto/create_film.dto";

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService,
              private readonly commonService: CommonService) {}

  @MessagePattern({ cmd: 'get-all-films' })
  async getAllFilms(@Ctx() context: RmqContext) {
    // this.commonService.acknowledgeMessage(context)

    return this.filmService.getAllFilms();
  }

  @MessagePattern({ cmd: 'create-film' })
  async createFilm(
      @Ctx() context: RmqContext,
      @Payload() payload,
  ) {
    // this.commonService.acknowledgeMessage(context)

    return this.filmService.createFilm(payload.createFilmDto, payload.directors);
  }
}
