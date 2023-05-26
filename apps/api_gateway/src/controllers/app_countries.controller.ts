import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Country, CreateCountryDto, Roles, RolesGuard, UpdateCountryDto} from "@app/common";


@ApiTags("Страны")
@Controller()
export class AppCountriesController {
    constructor(@Inject("COUNTRY") private readonly countryClient: ClientProxy) {}

    @ApiOperation({summary: "Создание новой страны. Лучше этот метод не использовать, а использовать метод parse/:id"})
    @ApiResponse({status: 201, type: Country})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/countries")
    async createCountry(@Body() createCountryDto: CreateCountryDto) {
        return this.countryClient.send(
            {
                cmd: "create-country",
            }, {
                createCountryDto
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех стран"})
    @ApiResponse({status: 200, type: [CreateCountryDto]})
    @Get("/countries")
    async getAllCountries() {
        return this.countryClient.send(
            {
                cmd: "get-all-countries",
            }, {

            },
        );
    }

    @ApiOperation({summary: "Получение страны по id"})
    @ApiResponse({status: 200, type: Country})
    @Get("/countries/:id")
    async getCountry(@Param("id") id: any) {
        return this.countryClient.send(
            {
                cmd: "get-country"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование страны по id"})
    @ApiResponse({status: 201, type: Country})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Put("/countries/:id")
    async editCountry(@Body() updateCountryDto: UpdateCountryDto,
                      @Param("id") id: any) {
        return this.countryClient.send(
            {
                cmd: "edit-country"
            }, {
                updateCountryDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Удаление страны по id"})
    @ApiResponse({status: 201})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Delete("/countries/:id")
    async deleteCountry(@Param("id") id: any) {
        return this.countryClient.send(
            {
                cmd: "delete-country"
            }, {
                id
            }
        )
    }
}
