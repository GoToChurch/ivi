import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {AppService} from "../app.service";
import {CreateGenreDto} from "@app/common";


@Controller()
export class AppGenresController {
    constructor(@Inject('GENRE') private readonly genreService: ClientProxy,
                private appService: AppService) {}

    @Post('/genres')
    async createGenre(@Body() createGenreDto: CreateGenreDto) {
        return this.genreService.send(
            {
                cmd: 'create-genre',
            },
            {
                createGenreDto
            },
        );
    }

    @Get('/genres')
    async getAllGenres() {
        return this.genreService.send(
            {
                cmd: 'get-all-genres',
            },
            {},
        );
    }

    @Get('/genres/:id')
    async getGenre(@Param('id') id: any) {
        return this.genreService.send(
            {
                cmd: 'get-genre'
            },
            {
                id
            }
        )
    }

    @Put('/genres/:id')
    async editGenre(@Body() createGenreDto: CreateGenreDto,
                    @Param('id') id: any) {
        return this.genreService.send(
            {
                cmd: 'edit-genre'
            },
            {
                createGenreDto,
                id
            }
        )
    }

    @Delete('/genres/:id')
    async deleteGenre(@Param('id') id: any) {
        return this.genreService.send(
            {
                cmd: 'delete-genre'
            },
            {
                id
            }
        )
    }
}
