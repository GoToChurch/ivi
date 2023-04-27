import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreatePersonDto, CreateProfessionDto} from "@app/common";
import {AppService} from "../app.service";


@Controller()
export class AppPersonsController {
    constructor(@Inject('PERSON') private readonly personService: ClientProxy,
                private appService: AppService) {}

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

    @Get('/persons')
    async getAllPersons() {
        return this.personService.send(
            {
                cmd: 'get-all-persons',
            },
            {},
        );
    }

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

    @Get('/professions')
    async getAllProfessions() {
        return this.personService.send(
            {
                cmd: 'get-all-professions',
            },
            {},
        );
    }

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
}