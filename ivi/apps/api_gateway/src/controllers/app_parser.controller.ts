import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {AppService} from "../app.service";
import {Roles, RolesGuard} from "@app/common";


@ApiTags("Парсинг")
@Controller()
export class AppParseController {
    constructor(private appService: AppService) {}

    @ApiOperation({summary: `Парсинг страницы всех фильмов кинопоиска и создание их сущностей в базе данных.
    Существует ограничение на 200 запросов в день. Парсинг одного фильма делает 2 запроса.`})
    @ApiQuery({ name: "from", required: false, example: 1,
        description: "С какой страницы начинать парсинг. Если не указано, то парсинг будет вестись с первой страницы"})
    @ApiQuery({ name: "to", required: false, example: 5,
        description: "До какой страницы продолжать парсинг. Если не указано, то парсинг будет вестись до второй страницы"})
    @ApiQuery({ name: "limit", required: false, example: 10,
        description: `Сколько фильмов будет на одной странице. Если не указано, то будет десять фильмов на странице
      Принимаемые значения: 10, 25, 50, 75, 100, 200`})
    @ApiResponse({status: 200})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Get("/parse")
    async startParser(@Query() query) {
        return this.appService.parseFilms(query);
    }

    @ApiOperation({summary: `Парсинг страницы фильма на кинопоиске с указанным id.
    Существует ограничение на 200 запросов в день. Парсинг одного фильма делает 2 запроса.`})
    @ApiResponse({status: 200})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Get("/parse/:id")
    async parseOneFilm(@Param("id") id: any) {
        return this.appService.parseOneFilm(id);
    }
}
