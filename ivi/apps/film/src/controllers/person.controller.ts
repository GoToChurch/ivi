import { Controller } from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CommonService} from "@app/common";
import {PersonService} from "../services/person.service";

@Controller()
export class PersonController {
    constructor(private readonly personService: PersonService,
                private readonly commonService: CommonService) {}

    @MessagePattern({ cmd: 'create-person' })
    async createPerson(@Ctx() context: RmqContext,
                       @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.createPerson(payload.createPersonDto);
    }

    @MessagePattern({ cmd: 'get-all-persons' })
    async getAllPersons(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getAllPersons();
    }

    @MessagePattern({ cmd: 'get-person' })
    async getPerson(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getPersonById(payload.id);
    }

    @MessagePattern({ cmd: 'edit-person' })
    async editPerson(@Ctx() context: RmqContext,
                         @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.editPerson(payload.createPersonDto, payload.id);
    }

    @MessagePattern({ cmd: 'delete-person' })
    async deletePerson(@Ctx() context: RmqContext,
                           @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.deletePerson(payload.id);
    }

    @MessagePattern({ cmd: 'create-profession' })
    async createProfession(@Ctx() context: RmqContext,
                           @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.createProfession(payload.createProfessionDto);
    }

    @MessagePattern({ cmd: 'get-all-professions' })
    async getAllProfession(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getAllProfessions();
    }

    @MessagePattern({ cmd: 'get-profession' })
    async getProfession(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getProfessionById(payload.id);
    }

    @MessagePattern({ cmd: 'edit-profession' })
    async editProfession(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.editProfession(payload.createProfessionDto, payload.id);
    }

    @MessagePattern({ cmd: 'delete-profession' })
    async deleteProfession(@Ctx() context: RmqContext,
                         @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.deleteProfession(payload.id);
    }

}