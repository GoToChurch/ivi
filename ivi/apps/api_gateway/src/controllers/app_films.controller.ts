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
        const directors = this.appService.getDirectors();
        const actors = this.appService.getActors();
        const writers = this.appService.getWriters();
        const producers = this.appService.getProducers();
        const cinematography = this.appService.getCinematography();
        const musicians = this.appService.getMusicians();
        const designers = this.appService.getDesigners();
        const editors = this.appService.getEditors();
        const genres = this.appService.getGenres();
        const countries = this.appService.getCountries();
        const awards = this.appService.getAwards();

        return this.filmService.send(
            {
                cmd: 'create-film',
            },
            {
                createFilmDto,
                directors,
                actors,
                writers,
                producers,
                cinematography,
                musicians,
                designers,
                editors,
                genres,
                countries,
                awards
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
}
