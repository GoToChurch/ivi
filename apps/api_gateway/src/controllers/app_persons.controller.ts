import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {
    CreateFilmDto,
    CreatePersonDto,
    CreateProfessionDto,
    Film,
    Person,
    Profession, Roles, RolesGuard,
    UpdatePersonDto, UpdateProfessionDto
} from "@app/common";


@ApiTags("Личности, участвующие в производстве фильмов")
@Controller()
export class AppPersonsController {
    constructor(@Inject("PERSON") private readonly personClient: ClientProxy) {}

    @ApiOperation({summary: "Создание новой персоны. Лучше этот метод не использовать, а использовать метод parse/:id"})
    @ApiResponse({status: 201, type: Person})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/persons")
    async createPerson(@Body() createPersonDto: CreatePersonDto) {
        return this.personClient.send(
            {
                cmd: "create-person",
            }, {
                createPersonDto,
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех персон"})
    @ApiQuery({ name: 'limit', required: false, example: 200, description: `Ограничение на количество 
    выводимых данных из бд`})
    @ApiResponse({status: 200, type: [CreatePersonDto]})
    @Get("/persons")
    async getAllPersons(@Query() query) {
        return this.personClient.send(
            {
                cmd: "get-all-persons",
            }, {
                query
            },
        );
    }

    @ApiOperation({summary: "Получение персоны по id"})
    @ApiResponse({status: 200, type: Person})
    @Get("/person/:id")
    async getPerson(@Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "get-person-by-id"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Получение всех персон с указанным именем и/или профессией"})
    @ApiQuery({name: "name", required: false, example: "Омар", description: `Имя персоны на русском или английском 
    языке. Может быть неполным`})
    @ApiQuery({name: "profession", required: false, example: "Актер", description: `Професссия персоны на 
    русском языке. Должно быть полным`})
    @ApiResponse({status: 200, type: [Person]})
    @Get("/persons/search")
    async searchPersons(@Query() query) {
        return this.personClient.send(
            {
                cmd: "search-persons"
            }, {
                query
            }
        )
    }

    @ApiOperation({summary: "Редактирование персоны по id"})
    @ApiResponse({status: 201, type: Person})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Put("/person/:id")
    async editPerson(@Body() updatePersonDto: UpdatePersonDto,
                     @Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "edit-person"
            }, {
                updatePersonDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Получение списка всех фильмов персоны по id"})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @Get("/person/:id/films")
    async getPersonsFilms(@Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "get-all-persons-films"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Получение списка всех профессий персоны по id"})
    @ApiResponse({status: 200, type: [CreateProfessionDto]})
    @Get("/person/:id/professions")
    async getPersonsProfessions(@Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "get-all-persons-professions"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Получение списка всех фильмов персоны по id, в которых она принимала участие в качестве professionId"})
    @ApiResponse({status: 200, type: [Film]})
    @Get("/person/:id/films/:professionId")
    async getPersonsFilmsByProfession(@Param("id") id: any,
                                      @Param("professionId") professionId: any) {
        return this.personClient.send(
            {
                cmd: "get-all-persons-films-by-profession"
            }, {
                id,
                professionId
            }
        )
    }

    @ApiOperation({summary: "Удаление персоны по id"})
    @ApiResponse({status: 201})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Delete("/person/:id")
    async deletePerson(@Param('id') id: any) {
        return this.personClient.send(
            {
                cmd: "delete-person"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Создание новой профессии"})
    @ApiResponse({status: 201, type: Profession})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/professions")
    async createProfession(@Body() createProfessionDto: CreateProfessionDto) {
        return this.personClient.send(
            {
                cmd: "create-profession",
            }, {
                createProfessionDto
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех профессий"})
    @ApiResponse({status: 200, type: [CreateProfessionDto]})
    @Get("/professions")
    async getAllProfessions() {
        return this.personClient.send(
            {
                cmd: "get-all-professions",
            }, {

            },
        );
    }

    @ApiOperation({summary: "Получение профессии по id"})
    @ApiResponse({status: 200, type: Profession})
    @Get("/professions/:id")
    async getProfession(@Param("id") id: any, @Req() req) {
        return this.personClient.send(
            {
                cmd: "get-profession"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование профессии по id"})
    @ApiResponse({status: 201, type: Profession})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Put("/professions/:id")
    async editProfession(@Body() updateProfessionDto: UpdateProfessionDto,
                         @Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "edit-profession"
            }, {
                updateProfessionDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Удаление профессии по id"})
    @ApiResponse({status: 201})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Delete("/professions/:id")
    async deleteProfession(@Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "delete-profession"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Добавление профессии персоне"})
    @ApiResponse({status: 201, type: Profession})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/person/:id/add/profession")
    async addProfessionForPerson(@Body() createProfessionDto: CreateProfessionDto,
                                 @Param("id") id: any) {
        return this.personClient.send(
            {
                cmd: "add-profession-for-person"
            }, {
                id,
                createProfessionDto
            },
        );
    }
}