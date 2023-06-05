import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {AppService} from "../app.service";
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";

import {
    AddAwardDto,
    AddCountryDto,
    AddGenreDto,
    AddPersonDto,
    AddRelatedFilmDto,
    CreateFilmDto, FILM,
    Film, Roles, RolesGuard, UpdateFilmDto,
} from "@app/common";


@ApiTags("Фильмы")
@Controller()
export class AppFilmsController {
    constructor(@Inject(FILM) private readonly filmClient: ClientProxy,
                private appService: AppService) {}

    @ApiOperation({summary: "Создание нового фильма. Лучше этот метод не использовать, а использовать метод parse/:id"})
    @ApiResponse({status: 201, type: Film})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films")
    async createFilm(@Body() createFilmDto: CreateFilmDto) {
        return this.filmClient.send(
            {
                cmd: "create-film",
            }, {
                createFilmDto,
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех фильмов"})
    @ApiQuery({ name: "db_limit", required: false, example: 200, description: `Ограничение на количество 
    выводимых данных из бд. Если присутствует, всегда выполняется в первую очередь`})
    @ApiQuery({ name: "person", required: false, example: "Мартин",  description: `Поиск фильма по имени персоны 
    как на русском, так и на английском языке`})
    @ApiQuery({ name: "search_query", required: false, example: "Inception", description: `Поиск фильма по названию 
    как на русском, так и на английском языке`})
    @ApiQuery({ name: "rating_gte", required: false, example: 5, description: `Фильтрация фильмов по рейтингу. 
    Ищутся фильмы с рейтингом больше или равным указанному`})
    @ApiQuery({ name: "ratingsNumber_gte", required: false, example: 10000, description: `Фильтрация фильмов по 
    количеству оценок. Ищутся фильмы с количеством оценок больше или равным указанному`})
    @ApiQuery({ name: "limit", required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @Get("/films")
    async getAllFilms(@Query() query) {
        return this.filmClient.send(
            {
                cmd: "get-all-films",
            }, {
                query
            },
        );
    }
    @ApiOperation({summary: `Фильтрация фильма по одному из фильтров: по жанру, по году, по стране. 
    Список доступных жанров можно посмотреть в файле libs/common/src/maps/maps.ts. Год может быть в виде числа, например '2011',
    или в виде числового интервала '2011-2020'. Страна принимает вид домена страны без точки, узнать который можно по ссылке 
    https://ru.wikipedia.org/wiki/Список_доменов_верхнего_уровня. Например для Франции это будет 'fr'.
    Имеется возможность фильтрации по нескольким жанрам или странам. В таком случае жанры или страны перечисляются через '+'.
    Примеры запроса: localhost:3000/films/filter/fr, localhost:3000/films/filter/drama+romance`})
    @ApiQuery({ name: "db_limit", required: false, example: 200, description: `Ограничение на количество 
    выводимых данных из бд. Если присутствует, всегда выполняется в первую очередь`})
    @ApiQuery({ name: "person", required: false, example: "Мартин",  description: `Поиск фильма по имени персоны 
    как на русском, так и на английском языке`})
    @ApiQuery({ name: "search_query", required: false, example: "Inception", description: `Поиск фильма по названию 
    как на русском, так и на английском языке`})
    @ApiQuery({ name: "rating_gte", required: false, example: 5, description: `Фильтрация фильмов по рейтингу. 
    Ищутся фильмы с рейтингом больше или равным указанному`})
    @ApiQuery({ name: "ratingsNumber_gte", required: false, example: 10000, description: `Фильтрация фильмов по 
    количеству оценок. Ищутся фильмы с количеством оценок больше или равным указанному`})
    @ApiQuery({ name: "limit", required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @ApiParam({name: "filter1", example: "drama", description: "Первый фильтр"})
    @Get("/films/filter/:filter1")
    async filterFilmWithOneFilter(@Param("filter1") filter1: any,
                                  @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);

        return this.filmClient.send(
            {
                cmd: "filter-films",
            }, {
                filterObject,
                query
            },
        );
    }

    @ApiOperation({summary: `Фильтрация фильма по двум из фильтров: по жанру, по году, по стране. 
    Список доступных жанров можно посмотреть в файле libs/common/src/maps/maps.ts. Год может быть в виде числа, например '2011',
    или в виде числового интервала '2011-2020'. Страна принимает вид домена страны без точки, узнать который можно по ссылке 
    https://ru.wikipedia.org/wiki/Список_доменов_верхнего_уровня. Например для Франции это будет 'fr'.
    Имеется возможность фильтрации по нескольким жанрам или странам. В таком случае жанры или страны перечисляются через '+'. 
    Порядок расположения фильтров: жанр -> год -> страна. Пример запроса: localhost:3000/films/filter/adventure/2010`})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @ApiQuery({ name: "db_limit", required: false, example: 200, description: `Ограничение на количество 
    выводимых данных из бд. Если присутствует, всегда выполняется в первую очередь`})
    @ApiQuery({ name: "person", required: false, example: "Мартин",  description: `Поиск фильма по имени персоны 
    как на русском, так и на английском языке`})
    @ApiQuery({ name: "search_query", required: false, example: "Inception", description: `Поиск фильма по названию 
    как на русском, так и на английском языке`})
    @ApiQuery({ name: "rating_gte", required: false, example: 5, description: `Фильтрация фильмов по рейтингу. 
    Ищутся фильмы с рейтингом больше или равным указанному`})
    @ApiQuery({ name: "ratingsNumber_gte", required: false, example: 10000, description: `Фильтрация фильмов по 
    количеству оценок. Ищутся фильмы с количеством оценок больше или равным указанному`})
    @ApiQuery({ name: "limit", required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiParam({name: "filter1", example: "drama", description: "Первый фильтр"})
    @ApiParam({name: "filter2", example: 2010, description: "Второй фильтр"})
    @Get("/films/filter/:filter1/:filter2")
    async filterFilmWithTwoFilters(@Param("filter1") filter1: any,
                                   @Param("filter2") filter2: any,
                                   @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        this.appService.addFiltersToFilterObject(filterObject, filter2);

        return this.filmClient.send(
            {
                cmd: "filter-films",
            }, {
                filterObject,
                query
            },
        );
    }

    @ApiOperation({summary: `Фильтрация фильма по двум из фильтров: по жанру, по году, по стране. 
    Список доступных жанров можно посмотреть в файле libs/common/src/maps/maps.ts. Год может быть в виде числа, например '2011',
    или в виде числового интервала '2011-2020'. Страна принимает вид домена страны без точки, узнать который можно по ссылке 
    https://ru.wikipedia.org/wiki/Список_доменов_верхнего_уровня. Например для Франции это будет 'fr'.
    Имеется возможность фильтрации по нескольким жанрам или странам. В таком случае жанры или страны перечисляются через '+'. 
    Порядок расположения фильтров: жанр -> год -> страна. Пример запроса: localhost:3000/films/filter/horror/2000-2005/us+ru`})
    @ApiQuery({ name: "db_limit", required: false, example: 200, description: `Ограничение на количество 
    выводимых данных из бд. Если присутствует, всегда выполняется в первую очередь`})
    @ApiQuery({ name: "person", required: false, example: "Мартин",  description: `Поиск фильма по имени персоны 
    как на русском, так и на английском языке`})
    @ApiQuery({ name: "search_query", required: false, example: "Inception", description: `Поиск фильма по названию 
    как на русском, так и на английском языке`})
    @ApiQuery({ name: "rating_gte", required: false, example: 5, description: `Фильтрация фильмов по рейтингу. 
    Ищутся фильмы с рейтингом больше или равным указанному`})
    @ApiQuery({ name: "ratingsNumber_gte", required: false, example: 10000, description: `Фильтрация фильмов по 
    количеству оценок. Ищутся фильмы с количеством оценок больше или равным указанному`})
    @ApiQuery({ name: "limit", required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @ApiParam({name: "filter1", example: "drama", description: "Первый фильтр"})
    @ApiParam({name: "filter2", example: 2010, description: "Второй фильтр"})
    @ApiParam({name: "filter3", example: "us", description: "Третий фильтр"})
    @Get("/films/filter/:filter1/:filter2/:filter3")
    async filterFilmWithThreeFilters(@Param("filter1") filter1: any,
                                     @Param("filter2") filter2: any,
                                     @Param("filter3") filter3: any,
                                     @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        this.appService.addFiltersToFilterObject(filterObject, filter2);
        this.appService.addFiltersToFilterObject(filterObject, filter3);

        return this.filmClient.send(
            {
                cmd: "filter-films",
            }, {
                filterObject,
                query
            },
        );
    }

    @ApiOperation({summary: "Получение фильма по id"})
    @ApiResponse({status: 200, type: Film})
    @ApiParam({name: "id", example: 1})
    @Get("/films/:id")
    async getFilm(@Param("id") id: any) {
        return this.filmClient.send(
            {
                cmd: "get-film",
            }, {
                id
            },
        );
    }

    @ApiOperation({summary: `Получение списка фильмов с указанным названием. Работает с русским и оригинальным,
    полным и неполныи названиями`})
    @ApiResponse({status: 200, type: Film})
    @ApiParam({name: "id", example: 1})
    @Get("/films/name/:name")
    async getFilmsByName(@Param("name") name: any) {
        return this.filmClient.send(
            {
                cmd: "get-films-by-name",
            },
            {
                name
            },
        );
    }

    @ApiOperation({summary: "Редактирование фильма по id, можно редактировать только название"})
    @ApiResponse({status: 201, type: Film})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Put("/films/:id")
    async editFilm(@Body() updateFilmDto: UpdateFilmDto,
                   @Param("id") id: any) {
        return this.filmClient.send(
            {
                cmd: "edit-film",
            }, {
                updateFilmDto,
                id
            },
        );
    }

    @ApiOperation({summary: "Удаление фильма по id"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Delete("/films/:id")
    async deleteFilm(@Param("id") id: any) {
        return this.filmClient.send(
            {
                cmd: "delete-film",
            }, {
                id
            },
        );
    }

    @ApiOperation({summary: "Добавление фильму с указанным id режиссера"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/director")
    async addDirector(@Body() addPersonDto: AddPersonDto,
                      @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-director"
        }, {
            id,
            addPersonDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id актера"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/actor")
    async addActor(@Body() addPersonDto: AddPersonDto,
                   @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-actor"
        }, {
            id,
            addPersonDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id сценариста"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/writer")
    async addWriter(@Body() addPersonDto: AddPersonDto,
                    @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-writer"
        }, {
            id,
            addPersonDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id продюсера"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/producer")
    async addProducer(@Body() addPersonDto: AddPersonDto,
                      @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-producer"
        }, {
            id,
            addPersonDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id оператора"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/cinematography")
    async addCinematography(@Body() addPersonDto: AddPersonDto,
                            @Param('id') id: any) {
        return this.filmClient.send({
            cmd: "add-cinematography"
        }, {
            id,
            addPersonDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id композитора"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/musician")
    async addMusician(@Body() addPersonDto: AddPersonDto,
                      @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-musician"
        }, {
            id,
            addPersonDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id художника"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/designer")
    async addDesigner(@Body() addPersonDto: AddPersonDto,
                      @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-designer"
        }, {
            id,
            addPersonDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id монтажера"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/editor")
    async addEditor(@Body() addPersonDto: AddPersonDto,
                    @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-editor"
        }, {
            id,
            addPersonDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id жанра"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/genre")
    async addGenre(@Body() addGenreDto: AddGenreDto,
                   @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-genre"
        }, {
            id,
            addGenreDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id страны"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/country")
    async addCountry(@Body() addCountryDto: AddCountryDto,
                     @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-country"
        }, {
            id,
            addCountryDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id награды"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/award")
    async addAward(@Body() addAwardDto: AddAwardDto,
                   @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-award"
        }, {
            id,
            addAwardDto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id связанного фильма"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/films/:id/add/relatedFilm")
    async addRelatedFilm(@Body() addRelatedFilmDto: AddRelatedFilmDto,
                         @Param("id") id: any) {
        return this.filmClient.send({
            cmd: "add-related-film"
        }, {
            id,
            addRelatedFilmDto
        })
    }

    @ApiOperation({summary: "Получение всех персон фильма с указанным id"})
    @ApiResponse({status: 200, type: Film})
    @ApiParam({name: "id", example: 1})
    @Get("/films/:id/persons")
    async getAllPersonsByFilm(@Param("id") id: any) {
        return this.filmClient.send({
            cmd: "get-all-persons"
        }, {
            id,
        })
    }
}
