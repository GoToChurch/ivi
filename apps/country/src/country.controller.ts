import {Controller} from "@nestjs/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CountryService} from "./country.service";


@Controller()
export class CountryController {
    constructor(private readonly countryService: CountryService) {}

    @MessagePattern({cmd: "create-country"})
    async createCountry(@Ctx() context: RmqContext,
                        @Payload() payload) {
        return this.countryService.createCountry(payload.createCountryDto);
    }

    @MessagePattern({cmd: "get-all-countries"})
    async getAllCountries(@Ctx() context: RmqContext) {
        return this.countryService.getAllCountries();
    }

    @MessagePattern({cmd: "get-country"})
    async getCountry(@Ctx() context: RmqContext,
                     @Payload() payload) {
        return this.countryService.getCountryById(payload.id);
    }

    @MessagePattern({cmd: "get-country-by-name"})
    async getCountryByName(@Ctx() context: RmqContext,
                           @Payload() payload) {
        return this.countryService.getCountryByName(payload.name);
    }


    @MessagePattern({cmd: "get-or-create-country"})
    async getOrCreateCounty(@Ctx() context: RmqContext,
                            @Payload() payload) {
        return this.countryService.getOrCreateCounty(payload.createCountryDto);
    }

    @MessagePattern({cmd: "edit-country"})
    async editCountry(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return this.countryService.editCountry(payload.updateCountryDto, payload.id);
    }

    @MessagePattern({cmd: "delete-country"})
    async deleteCountry(@Ctx() context: RmqContext,
                        @Payload() payload) {
        return this.countryService.deleteCountry(payload.id);
    }

    @MessagePattern({cmd: "get-films-ids-by-countries"})
    async getFilmsIdsByCountries(@Ctx() context: RmqContext,
                             @Payload() payload) {
        return this.countryService.getFilmsIdsByCountries(payload.countries);
    }
}