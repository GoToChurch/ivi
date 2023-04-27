import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {AppService} from "../app.service";
import {CreateCountryDto} from "@app/common";


@Controller()
export class AppCountriesController {
    constructor(@Inject('COUNTRY') private readonly countryService: ClientProxy,
                private appService: AppService) {}

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

    @Get('/countries')
    async getAllCountries() {
        return this.countryService.send(
            {
                cmd: 'get-all-countries',
            },
            {},
        );
    }

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
