import { Controller, Get } from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CommonService} from "@app/common";
import {CreateFilmDto} from "../dto/create_film.dto";
import {PersonService} from "../services/person.service";
import {CreatePersonDto} from "../dto/create_person.dto";
import {CreateProfessionDto} from "../dto/create_profession.dto";

@Controller()
export class PersonController {
    constructor(private readonly personService: PersonService,
                private readonly commonService: CommonService) {}

    @MessagePattern({ cmd: 'get-all-persons' })
    async getAllPersons(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getAllPersons();
    }

    @MessagePattern({ cmd: 'create-person' })
    async createPerson(
        @Ctx() context: RmqContext,
        @Payload() payload,
    ) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.createPerson(payload.createPersonDto);
    }

    @MessagePattern({ cmd: 'get-all-professions' })
    async getAllProfession(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getAllProfessions();
    }

    @MessagePattern({ cmd: 'create-profession' })
    async createProfession(
        @Ctx() context: RmqContext,
        @Payload() payload,
    ) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.createProfession(payload.createProfessionDto);
    }

}