import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateGenreDto, Genre, Roles, RolesGuard, UpdateGenreDto} from "@app/common";


@ApiTags("Жанры фильмов")
@Controller()
export class AppGenresController {
    constructor(@Inject("GENRE") private readonly genreClient: ClientProxy) {}

    @ApiOperation({summary: "Создание нового жанра"})
    @ApiResponse({status: 201, type: Genre})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/genres")
    async createGenre(@Body() createGenreDto: CreateGenreDto) {
        return this.genreClient.send(
            {
                cmd: "create-genre",
            }, {
                createGenreDto
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех жанров"})
    @ApiResponse({status: 200, type: [CreateGenreDto]})
    @Get("/genres")
    async getAllGenres() {
        return this.genreClient.send(
            {
                cmd: "get-all-genres",
            }, {

            },
        );
    }

    @ApiOperation({summary: "Получение жанра по id"})
    @ApiResponse({status: 200, type: Genre})
    @Get("/genres/:id")
    async getGenre(@Param("id") id: any) {
        return this.genreClient.send(
            {
                cmd: "get-genre"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование жанра по id"})
    @ApiResponse({status: 201, type: Genre})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Put("/genres/:id")
    async editGenre(@Body() updateGenreDto: UpdateGenreDto,
                    @Param("id") id: any) {
        return this.genreClient.send(
            {
                cmd: "edit-genre"
            }, {
                updateGenreDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Удаление страны по id"})
    @ApiResponse({status: 201})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Delete("/genres/:id")
    async deleteGenre(@Param('id') id: any) {
        return this.genreClient.send(
            {
                cmd: "delete-genre"
            }, {
                id
            }
        )
    }
}
