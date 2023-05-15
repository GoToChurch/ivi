import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {AppService} from "../app.service";
import {
    AddPersonDto,
    AddRelatedFilmDto,
    CreateFilmDto,
    Film
} from "@app/common";
import {ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@app/common";
import {RolesGuard} from "@app/common";


@ApiTags('Фильмы')
@Controller()
export class AppFilmsController {
    constructor(@Inject('FILM') private readonly filmService: ClientProxy,
                private appService: AppService) {}

    @ApiOperation({summary: "Создание нового фильма. Лучше этот метод не использовать, а использовать метод parse/:id"})
    @ApiResponse({status: 201, type: Film})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films')
    async createFilm(@Body() createFilmDto: CreateFilmDto) {
        return this.filmService.send(
            {
                cmd: 'create-film',
            },
            {
                createFilmDto,
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех фильмов"})
    @ApiQuery({ name: 'person', description: "Поиск фильма по имени персоны как на русском, " +
            "так и на английском языке", example: "Мартин", required: false})
    @ApiQuery({ name: 'search_query', required: false, example: "Inception", description: "Поиск фильма по названию" +
            "как на русском, так и на английском языке"})
    @ApiQuery({ name: 'rating_gte', required: false, example: 5, description: "Фильтрация фильмов по рейтингу. " +
            "Ищутся фильмы с рейтингом больше или равным указанному"})
    @ApiQuery({ name: 'ratingsNumber_gte', required: false, example: 10000, description: "Фильтрация фильмов по количеству оценок. " +
            "Ищутся фильмы с количеством оценок больше или равным указанному"})
    @ApiQuery({ name: 'limit', required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @Get('/films')
    async getAllFilms(@Query() query) {
        return this.filmService.send(
            {
                cmd: 'get-all-films',
            },
            {
                query
            },
        );
    }

    @ApiOperation({summary: "Получение фильма по id"})
    @ApiResponse({status: 200, type: Film})
    @ApiParam({name: "id", example: 1})
    @Get('/films/:id')
    async getFilm(@Param('id') id: any) {
        return this.filmService.send(
            {
                cmd: 'get-film',
            },
            {
                id
            },
        );
    }

    @ApiOperation({summary: "Получение списка фильмов с указанным названием. Работает с русским и оригинальным названиями"})
    @ApiResponse({status: 200, type: Film})
    @ApiParam({name: "id", example: 1})
    @Get('/films/name/:name')
    async getFilmsByName(@Param('name') name: any) {
        return this.filmService.send(
            {
                cmd: 'get-films-by-name',
            },
            {
                name
            },
        );
    }

    @ApiOperation({summary: "Редактирование фильма по id, можно редактировать только название"})
    @ApiResponse({status: 201, type: Film})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Put('/films/:id')
    async editFilm(@Body() name: string,
                   @Param('id') id: any) {
        return this.filmService.send(
            {
                cmd: 'edit-film',
            },
            {
                name,
                id
            },
        );
    }

    @ApiOperation({summary: "Удаление фильма по id"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Delete('/films/:id')
    async deleteFilm(@Param('id') id: any) {
        return this.filmService.send(
            {
                cmd: 'delete-film',
            },
            {
                id
            },
        );
    }

    @ApiOperation({summary: `Фильтрация фильма по одному из фильтров: по жанру, по году, по стране. 
    Список доступных жанров можно посмотреть в файле libs/common/src/maps/maps.ts. Год может быть в виде числа, например '2011',
    или в виде числового интервала '2011-2020'. Страна принимает вид домена страны без точки, узнать который можно по ссылке 
    https://ru.wikipedia.org/wiki/Список_доменов_верхнего_уровня. Например для Франции это будет 'fr'.
    Имеется возможность фильтрации по нескольким жанрам или странам. В таком случае жанры или страны перечисляются через '+'.
    Примеры запроса: localhost:3000/films/filter/fr, localhost:3000/films/filter/drama+romance`})
    @ApiQuery({ name: 'person', description: "Поиск фильма по имени персоны как на русском, " +
            "так и на английском языке", example: "Мартин", required: false})
    @ApiQuery({ name: 'search_query', required: false, example: "Inception", description: "Поиск фильма по названию" +
            "как на русском, так и на английском языке"})
    @ApiQuery({ name: 'rating_gte', required: false, example: 5, description: "Фильтрация фильмов по рейтингу. " +
            "Ищутся фильмы с рейтингом больше или равным указанному"})
    @ApiQuery({ name: 'ratingsNumber_gte', required: false, example: 10000, description: "Фильтрация фильмов по количеству оценок. " +
            "Ищутся фильмы с количеством оценок больше или равным указанному"})
    @ApiQuery({ name: 'limit', required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @ApiParam({name: "filter1", example: "drama", description: "Первый фильтр"})
    @Get('/films/filter/:filter1')
    async filterFilmWithOneFilter(@Param('filter1') filter1: any,
                                  @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);

        return this.filmService.send(
            {
                cmd: 'filter-films',
            },
            {
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
    @ApiQuery({ name: 'person', description: "Поиск фильма по имени персоны как на русском, " +
            "так и на английском языке", example: "Мартин", required: false})
    @ApiQuery({ name: 'search_query', required: false, example: "Inception", description: "Поиск фильма по названию" +
            "как на русском, так и на английском языке"})
    @ApiQuery({ name: 'rating_gte', required: false, example: 5, description: "Фильтрация фильмов по рейтингу. " +
            "Ищутся фильмы с рейтингом больше или равным указанному"})
    @ApiQuery({ name: 'ratingsNumber_gte', required: false, example: 10000, description: "Фильтрация фильмов по количеству оценок. " +
            "Ищутся фильмы с количеством оценок больше или равным указанному"})
    @ApiQuery({ name: 'limit', required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiParam({name: "filter1", example: "drama", description: "Первый фильтр"})
    @ApiParam({name: "filter2", example: 2010, description: "Второй фильтр"})
    @Get('/films/filter/:filter1/:filter2')
    async filterFilmWithTwoFilters(@Param('filter1') filter1: any,
                                   @Param('filter2') filter2: any,
                                   @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        this.appService.addFiltersToFilterObject(filterObject, filter2);

        return this.filmService.send(
            {
                cmd: 'filter-films',
            },
            {
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
    @ApiQuery({ name: 'person', description: "Поиск фильма по имени персоны как на русском, " +
            "так и на английском языке", example: "Мартин", required: false})
    @ApiQuery({ name: 'search_query', required: false, example: "Inception", description: "Поиск фильма по названию" +
            "как на русском, так и на английском языке"})
    @ApiQuery({ name: 'rating_gte', required: false, example: 5, description: "Фильтрация фильмов по рейтингу. " +
            "Ищутся фильмы с рейтингом больше или равным указанному"})
    @ApiQuery({ name: 'ratingsNumber_gte', required: false, example: 10000, description: "Фильтрация фильмов по количеству оценок. " +
            "Ищутся фильмы с количеством оценок больше или равным указанному"})
    @ApiQuery({ name: 'limit', required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @ApiParam({name: "filter1", example: "drama", description: "Первый фильтр"})
    @ApiParam({name: "filter2", example: 2010, description: "Второй фильтр"})
    @ApiParam({name: "filter3", example: "us", description: "Третий фильтр"})
    @Get('/films/filter/:filter1/:filter2/:filter3')
    async filterFilmWithThreeFilters(@Param('filter1') filter1: any,
                                     @Param('filter2') filter2: any,
                                     @Param('filter3') filter3: any,
                                     @Query() query) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        this.appService.addFiltersToFilterObject(filterObject, filter2);
        this.appService.addFiltersToFilterObject(filterObject, filter3);

        return this.filmService.send(
            {
                cmd: 'filter-films',
            },
            {
                filterObject,
                query
            },
        );
    }

    //@ApiOperation({summary: "Добавление комментария к фильму с указанным filmId"})
    //@ApiResponse({status: 201, type: Review})
    //@ApiParam({name: "filmId", example: 1, description: "id фильма"})
    //@UseGuards(Jwt_auth_guard || GoogleAuthenticatedGuard)
    //@Post('/films/:filmId')
    //async addReview(@Body() createReviewDto: CreateReviewDto,
    //                @Req() request,
    //                @Param('filmId') filmId: any) {
    //    const user = request.user;
    //    const userId = user ? user.id : 1;
//
    //    return this.filmService.send(
    //        {
    //            cmd: 'create-review',
    //        },
    //        {
    //            createReviewDto,
    //            filmId,
    //            userId
    //        },
    //    );
    //}
    //@ApiOperation({summary: "Добавление комментария к комментарию с указанным parentId к фильму с указанным filmId"})
    //@ApiResponse({status: 201, type: Review})
    //@ApiParam({name: "filmId", example: 1, description: "id фильма"})
    //@ApiParam({name: "parentId", example: 1, description: "id родительского комментария"})
    //@Post('/films/:filmId/review/:parentId')
    //async addChildReview(@Body() createReviewDto: CreateReviewDto,
    //                     @Req() request,
    //                     @Param('filmId') filmId: any,
    //                     @Param('parentId') parentId: any) {
    //    const user = request.user;
    //    const userId = user ? user.id : 1;

    //    return this.filmService.send(
    //        {
    //            cmd: 'create-review',
    //        },
    //        {
    //            createReviewDto,
    //            filmId,
    //            userId,
    //            parentId
    //        },
    //    );
    //}

    //@ApiOperation({summary: "Получение списка всех комментариев"})
    //@ApiResponse({status: 200, type: [CreateReviewDto]})
    //@Get('/reviews')
    //async getAllReviews() {
    //    return this.filmService.send(
    //        {
    //            cmd: 'get-all-reviews',
    //        },
    //        {},
    //    );
    //}

    //@ApiOperation({summary: "Получение списка комментария по id"})
    //@ApiResponse({status: 200, type: Review})
    //@ApiParam({name: "id", example: 1})
    //@UseGuards(Jwt_auth_guard || GoogleAuthenticatedGuard)
    //@Get('/reviews/:id')
    //async getReview(@Param('id') id: any) {
    //    return this.filmService.send(
    //        {
    //            cmd: 'get-review'
    //        },
    //        {
    //            id
    //        }
    //    )
    //}

    //@ApiOperation({summary: "Редактирование комментария с указанным id"})
    //@ApiResponse({status: 201, type: Review})
    //@ApiParam({name: "id", example: 1})
    //@UseGuards(Current_user_or_admin_guard)
    //@Put('/reviews/:id')
    //async editReview(@Body() createReviewDto: CreateReviewDto,
    //                 @Param('id') id: any) {
    //    return this.filmService.send(
    //        {
    //            cmd: 'edit-review'
    //        },
    //        {
    //            createReviewDto,
    //            id
    //        }
    //    )
    //}

    //@ApiOperation({summary: "Удаление комментария с указанным id"})
    //@ApiResponse({status: 201})
    //@ApiParam({name: "id", example: 1})
    //@UseGuards(Current_user_or_admin_guard)
    //@Delete('/reviews/:id')
    //async deleteReview(@Param('id') id: any) {
    //    return this.filmService.send(
    //        {
    //            cmd: 'delete-review'
    //        },
    //        {
    //            id
    //        }
    //    )
    //}

    @ApiOperation({summary: "Добавление фильму с указанным id режиссера"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/director')
    async addDirector(@Body() dto: AddPersonDto,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-director'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id актера"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/actor')
    async addActor(@Body() dto: AddPersonDto,
                   @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-actor'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id сценариста"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/writer')
    async addWriter(@Body() dto: AddPersonDto,
                    @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-writer'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id продюсера"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/producer')
    async addProducer(@Body() dto: AddPersonDto,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-producer'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id оператора"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/cinematography')
    async addCinematography(@Body() dto: AddPersonDto,
                            @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-cinematography'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id композитора"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/musician')
    async addMusician(@Body() dto: AddPersonDto,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-musician'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id художника"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/designer')
    async addDesigner(@Body() dto: AddPersonDto,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-designer'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id монтажера"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/editor')
    async addEditor(@Body() dto: AddPersonDto,
                    @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-editor'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id жанра"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/genre')
    async addGenre(@Body() dto: AddPersonDto,
                   @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-genre'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id страны"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/country')
    async addCountry(@Body() dto: AddPersonDto,
                     @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-country'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id награды"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/award')
    async addAward(@Body() dto: AddPersonDto,
                   @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-award'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Добавление фильму с указанным id связанного фильма"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/films/:id/add/relatedFilm')
    async addRelatedFilm(@Body() dto: AddRelatedFilmDto,
                         @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-related-film'
        }, {
            id,
            dto
        })
    }

    @ApiOperation({summary: "Получение всех персон фильма с указанным id"})
    @ApiResponse({status: 200, type: Film})
    @ApiParam({name: "id", example: 1})
    @Get('/films/:id/persons')
    async getAllPersonsByFilm(@Param('id') id: any) {
        return this.filmService.send({
            cmd: 'get-all-persons'
        }, {
            id,
        })
    }
}
