import {Controller} from "@nestjs/common";
import {CommonService} from "@app/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CountryService} from "./country.service";


@Controller()
export class CountryController {
    constructor(private readonly countryService: CountryService,
                private readonly commonService: CommonService) {
    }

    @MessagePattern({cmd: 'create-country'})
    async createCountry(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.countryService.createCountry(payload.createCountryDto);
    }

    @MessagePattern({cmd: 'get-all-countries'})
    async getAllCountries(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.countryService.getAllCountries();
    }

    @MessagePattern({cmd: 'get-country'})
    async getCountry(@Ctx() context: RmqContext,
                     @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.countryService.getCountryById(payload.id);
    }

    @MessagePattern({cmd: 'get-or-create-country'})
    async getOrCreateCounty(@Ctx() context: RmqContext,
                     @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.countryService.getOrCreateCounty(payload.dto);
    }

    @MessagePattern({cmd: 'edit-country'})
    async editCountry(@Ctx() context: RmqContext,
                      @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.countryService.editCountry(payload.createCountryDto, payload.id);
    }

    @MessagePattern({cmd: 'delete-country'})
    async deleteCountry(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.countryService.deleteCountry(payload.id);
    }

    @MessagePattern({cmd: 'get-films-ids-by-countries'})
    async getFilmsIdsByCountries(@Ctx() context: RmqContext,
                             @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.countryService.getFilmsIdsByCountries(payload.countries);
    }

    @MessagePattern({ cmd: 'get-or-create-country' })
    async getOrCreateCountry(@Ctx() context: RmqContext,
                           @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.countryService.getOrCreateCounty(payload.dto);
    }
}