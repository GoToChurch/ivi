import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateFilmDto, CreatePersonDto, CreateProfessionDto, Film, Person, Profession} from "@app/common";
import {AppService} from "../app.service";
import {ApiOperation, ApiQuery, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@app/common";
import {RolesGuard} from "@app/common";

@ApiTags('Личности, участвующие в производстве фильмов')
@Controller()
export class AppPersonsController {
    constructor(@Inject('PERSON') private readonly personService: ClientProxy,
                private appService: AppService) {}

    @ApiOperation({summary: "Создание новой персоны. Лучше этот метод не использовать, а использовать метод parse/:id"})
    @ApiResponse({status: 201, type: Person})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/persons')
    async createPerson(@Body() createPersonDto: CreatePersonDto) {
        return this.personService.send(
            {
                cmd: 'create-person',
            },
            {
                createPersonDto,
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех персон"})
    @ApiQuery({ name: 'search_query', required: false, example: "Омар", description: "Поиск персоны по имени" +
            "как на русском, так и на английском языке"})
    @ApiQuery({ name: 'limit', required: false, example: 200, description: "Ограничение на количество выводимых данных"})
    @ApiResponse({status: 200, type: [CreatePersonDto]})
    @Get('/persons')
    async getAllPersons(@Query() query) {
        return this.personService.send(
            {
                cmd: 'get-all-persons',
            },
            {
                query
            },
        );
    }

    @ApiOperation({summary: "Получение персоны по id"})
    @ApiResponse({status: 200, type: Person})
    @Get('/persons/:id')
    async getPerson(@Param('id') id: any) {
        return this.personService.send(
            {
                cmd: 'get-person'
            },
            {
                id
            }
        )
    }

    @ApiOperation({summary: "Получение всех персон с указанным именем. Работает с русским и оригинальным именами"})
    @ApiResponse({status: 200, type: [Person]})
    @Get('/persons/name/:name')
    async getPersonsByName(@Param('name') name: any) {
        return this.personService.send(
            {
                cmd: 'get-persons-by-name'
            },
            {
                name
            }
        )
    }

    @ApiOperation({summary: "Редактирование персоны по id"})
    @ApiResponse({status: 201, type: Person})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Put('/persons/:id')
    async editPerson(@Body() createPersonDto: CreatePersonDto,
                     @Param('id') id: any) {
        return this.personService.send(
            {
                cmd: 'edit-person'
            },
            {
                createPersonDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Получение списка всех фильмов персоны по id"})
    @ApiResponse({status: 200, type: [CreateFilmDto]})
    @Get('/persons/:id/films')
    async getPersonsFilms(@Param('id') id: any) {
        return this.personService.send(
            {
                cmd: 'get-all-persons-films'
            },
            {
                id
            }
        )
    }

    @ApiOperation({summary: "Получение списка всех профессий персоны по id"})
    @ApiResponse({status: 200, type: [CreateProfessionDto]})
    @Get('/persons/:id/professions')
    async getPersonsProfessions(@Param('id') id: any) {
        return this.personService.send(
            {
                cmd: 'get-all-persons-professions'
            },
            {
                id
            }
        )
    }

    @ApiOperation({summary: "Получение списка всех фильмов персоны по id, в которых она принимала участие в качестве professionId"})
    @ApiResponse({status: 200, type: [Film]})
    @Get('/persons/:id/films/:professionId')
    async getPersonsFilmsByProfession(@Param('id') id: any,
                                      @Param('professionId') professionId: any) {
        return this.personService.send(
            {
                cmd: 'get-all-persons-films-by-profession'
            },
            {
                id,
                professionId
            }
        )
    }

    @ApiOperation({summary: "Удаление персоны по id"})
    @ApiResponse({status: 201})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Delete('/persons/:id')
    async deletePerson(@Param('id') id: any) {
        return this.personService.send(
            {
                cmd: 'delete-person'
            },
            {
                id
            }
        )
    }

    @ApiOperation({summary: "Создание новой профессии"})
    @ApiResponse({status: 201, type: Profession})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/professions')
    async createProfession(@Body() createProfessionDto: CreateProfessionDto) {
        return this.personService.send(
            {
                cmd: 'create-profession',
            },
            {
                createProfessionDto
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех профессий"})
    @ApiResponse({status: 200, type: [CreateProfessionDto]})
    @Get('/professions')
    async getAllProfessions() {
        return this.personService.send(
            {
                cmd: 'get-all-professions',
            },
            {},
        );
    }

    @ApiOperation({summary: "Получение профессии по id"})
    @ApiResponse({status: 200, type: Profession})
    @Get('/professions/:id')
    async getProfession(@Param('id') id: any, @Req() req) {
        return this.personService.send(
            {
                cmd: 'get-profession'
            },
            {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование профессии по id"})
    @ApiResponse({status: 201, type: Profession})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Put('/professions/:id')
    async editProfession(@Body() createProfessionDto: CreateProfessionDto,
                         @Param('id') id: any) {
        return this.personService.send(
            {
                cmd: 'edit-profession'
            },
            {
                createProfessionDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Удаление профессии по id"})
    @ApiResponse({status: 201})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Delete('/professions/:id')
    async deleteProfession(@Param('id') id: any) {
        return this.personService.send(
            {
                cmd: 'delete-profession'
            },
            {
                id
            }
        )
    }

    @ApiOperation({summary: "Добавление профессии персоне"})
    @ApiResponse({status: 201, type: Profession})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/person/:id/add/profession')
    async addProfessionForPerson(@Body() dto: CreateProfessionDto) {
        return this.personService.send(
            {
                cmd: 'add-profession-for-person',
            },
            {
                dto
            },
        );
    }
}