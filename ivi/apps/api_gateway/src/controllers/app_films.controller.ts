import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {AppService} from "../app.service";
import {CreateFilmDto, CreateReviewDto} from "@app/common";


@Controller()
export class AppFilmsController {
    constructor(@Inject('FILM') private readonly filmService: ClientProxy,
                private appService: AppService) {}

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

    @Get('/films')
    async getAllFilms(@Req() request) {
        const query = request.query;

        return this.filmService.send(
            {
                cmd: 'get-all-films',
            },
            {
                query
            },
        );
    }

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

    @Get('/films/name/:name')
    async getFilmByName(@Param('name') name: any) {
        return this.filmService.send(
            {
                cmd: 'get-films-by-name',
            },
            {
                name
            },
        );
    }

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

    @Get('/films/filter/:filter1')
    async filterFilmWithOneFilter(@Param('filter1') filter1: any,
                                  @Req() request) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        const query = request.query;

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

    @Get('/films/filter/:filter1/:filter2')
    async filterFilmWithTwoFilters(@Param('filter1') filter1: any,
                                   @Param('filter2') filter2: any,
                                   @Req() request) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        this.appService.addFiltersToFilterObject(filterObject, filter2);

        const query = request.query;

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

    @Get('/films/filter/:filter1/:filter2/:filter3')
    async filterFilmWithThreeFilters(@Param('filter1') filter1: any,
                                     @Param('filter2') filter2: any,
                                     @Param('filter3') filter3: any,
                                     @Req() request) {
        let filterObject = {
            genres: null,
            year: null,
            countries: null
        }

        this.appService.addFiltersToFilterObject(filterObject, filter1);
        this.appService.addFiltersToFilterObject(filterObject, filter2);
        this.appService.addFiltersToFilterObject(filterObject, filter3);

        const query = request.query;

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

    @Post('/films/:filmId')
    async addReview(@Body() createReviewDto: CreateReviewDto,
                    @Req() request,
                    @Param('filmId') filmId: any) {
        const user = request.user;
        const userId = user ? user.id : 1;

        return this.filmService.send(
            {
                cmd: 'create-review',
            },
            {
                createReviewDto,
                filmId,
                userId
            },
        );
    }

    @Post('/films/:filmId/review/:parentId')
    async addChildReview(@Body() createReviewDto: CreateReviewDto,
                         @Req() request,
                         @Param('filmId') filmId: any,
                         @Param('parentId') parentId: any) {
        const user = request.user;
        const userId = user ? user.id : 1;

        return this.filmService.send(
            {
                cmd: 'create-review',
            },
            {
                createReviewDto,
                filmId,
                userId,
                parentId
            },
        );
    }

    @Get('/reviews')
    async getAllReviews() {
        return this.filmService.send(
            {
                cmd: 'get-all-reviews',
            },
            {},
        );
    }

    @Get('/reviews/:id')
    async getReview(@Param('id') id: any) {
        return this.filmService.send(
            {
                cmd: 'get-review'
            },
            {
                id
            }
        )
    }

    @Put('/reviews/:id')
    async editReview(@Body() createReviewDto: CreateReviewDto,
                     @Param('id') id: any) {
        return this.filmService.send(
            {
                cmd: 'edit-review'
            },
            {
                createReviewDto,
                id
            }
        )
    }

    @Delete('/reviews/:id')
    async deleteReview(@Param('id') id: any) {
        return this.filmService.send(
            {
                cmd: 'delete-review'
            },
            {
                id
            }
        )
    }

    @Post('/films/:id/add/director')
    async addDirector(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-director'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/actor')
    async addActor(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-actor'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/writer')
    async addWriter(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-writer'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/producer')
    async addProducer(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-producer'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/cinematography')
    async addCinematography(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-cinematography'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/musician')
    async addMusician(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-musician'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/designer')
    async addDesigner(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-designer'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/editor')
    async addEditor(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-editor'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/genre')
    async addGenre(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-genre'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/country')
    async addCountry(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-country'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/award')
    async addAward(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-award'
        }, {
            id,
            name
        })
    }

    @Post('/films/:id/add/relatedFilm')
    async addRelatedFilm(@Body() name,
                      @Param('id') id: any) {
        return this.filmService.send({
            cmd: 'add-related-film'
        }, {
            id,
            name
        })
    }
}
