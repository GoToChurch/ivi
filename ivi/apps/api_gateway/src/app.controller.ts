import {Controller, Get, Param, Req} from '@nestjs/common';
import {AppService} from "./app.service";

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

    @Get('/parse/')
    async startParser(@Req() request) {
      const query = request.query;
      return this.appService.parseFilms(query);
    }

  @Get('/parse/:id')
  async parseOneFilm(@Param('id') id: any) {
    return this.appService.parseOneFilm(id);
  }
}
