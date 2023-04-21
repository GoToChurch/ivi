import { Controller } from '@nestjs/common';
import { FilmService } from '../services/film.service';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CommonService} from "@app/common";


@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService,
              private readonly commonService: CommonService) {}

  @MessagePattern({ cmd: 'create-film' })
  async createFilm(
      @Ctx() context: RmqContext,
      @Payload() payload,
  ) {
    // this.commonService.acknowledgeMessage(context)

    return this.filmService.createFilm(
        payload.createFilmDto,
        payload.directors,
        payload.actors,
        payload.writers,
        payload.producers,
        payload.cinematography,
        payload.musicians,
        payload.designers,
        payload.editors,
        payload.genres,
        payload.countries,
        payload.awards,
        payload.nominations,
    );
  }

  @MessagePattern({ cmd: 'get-all-films' })
  async getAllFilms(@Ctx() context: RmqContext,
                    @Payload() payload) {
    // this.commonService.acknowledgeMessage(context)

    return this.filmService.getAllFilms(payload.query);
  }

  @MessagePattern({ cmd: 'get-film' })
  async getFilm(@Ctx() context: RmqContext,
                @Payload() payload) {
    // this.commonService.acknowledgeMessage(context)

    return this.filmService.getFilmById(payload.id);
  }

  @MessagePattern({ cmd: 'edit-film' })
  async editFilm(@Ctx() context: RmqContext,
                 @Payload() payload) {
    // this.commonService.acknowledgeMessage(context)

    return this.filmService.editFilm(payload.name, payload.id);
  }

  @MessagePattern({ cmd: 'delete-film' })
  async deleteFilm(@Ctx() context: RmqContext,
                   @Payload() payload) {
    // this.commonService.acknowledgeMessage(context)

    return this.filmService.deleteFilm(payload.id);
  }

  @MessagePattern({ cmd: 'filter-films' })
  async filterFilm(@Ctx() context: RmqContext,
                   @Payload() payload) {
    // this.commonService.acknowledgeMessage(context)



    return this.filmService.filterFilms(
        payload.filterObject.genres,
        payload.filterObject.year,
        payload.filterObject.countries,
        payload.query);
  }

}
