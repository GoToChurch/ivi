import {Controller, Get, Param} from '@nestjs/common';
import {AppService} from "./app.service";




@Controller()
export class AppController {
  constructor(private appService: AppService) {}

    @Get('/parser')
    async startParser() {
      return this.appService.fillDataBase();
    }

  @Get('/parse/:id')
  async parseOneFilm(@Param('id') id: any) {
    return this.appService.parseOneFilm(id);
  }
}
