import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {AppService} from "../app.service";
import {Country, CreateCountryDto} from "@app/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Roles} from "@app/common";
import {RolesGuard} from "@app/common";

@ApiTags('Страны')
@Controller()
export class AppCountriesController {
    constructor(@Inject('COUNTRY') private readonly countryService: ClientProxy,
                private appService: AppService) {}

    @ApiOperation({summary: "Создание новой страны. Лучше этот метод не использовать, а использовать метод parse/:id"})
    @ApiResponse({status: 201, type: Country})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post('/countries')
    async createCountry(@Body() createCountryDto: CreateCountryDto) {
        return this.countryService.send(
            {
                cmd: 'create-country',
            },
            {
                createCountryDto
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех стран"})
    @ApiResponse({status: 200, type: [CreateCountryDto]})
    @Get('/countries')
    async getAllCountries() {
        return this.countryService.send(
            {
                cmd: 'get-all-countries',
            },
            {},
        );
    }

    @ApiOperation({summary: "Получение страны по id"})
    @ApiResponse({status: 200, type: Country})
    @Get('/countries/:id')
    async getCountry(@Param('id') id: any) {
        return this.countryService.send(
            {
                cmd: 'get-country'
            },
            {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование страны по id"})
    @ApiResponse({status: 201, type: Country})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Put('/countries/:id')
    async editCountry(@Body() createCountryDto: CreateCountryDto,
                      @Param('id') id: any) {
        return this.countryService.send(
            {
                cmd: 'edit-country'
            },
            {
                createCountryDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Удаление страны по id"})
    @ApiResponse({status: 201})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Delete('/countries/:id')
    async deleteCountry(@Param('id') id: any) {
        return this.countryService.send(
            {
                cmd: 'delete-country'
            },
            {
                id
            }
        )
    }
}
