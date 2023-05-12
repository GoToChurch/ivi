import {Controller} from '@nestjs/common';
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CommonService} from "@app/common";
import {PersonService} from "./person.service";


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

    @MessagePattern({ cmd: 'get-or-create-person' })
    async getOrCreatePerson(@Ctx() context: RmqContext,
                            @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getOrCreatePerson(payload.createPersonDto);
    }

    @MessagePattern({ cmd: 'get-all-persons' })
    async getAllPersons(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getAllPersons(payload.query);
    }

    @MessagePattern({ cmd: 'get-person' })
    async getPerson(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getPersonById(payload.id);
    }

    @MessagePattern({ cmd: 'get-person-by-name' })
    async getPersonByName(@Ctx() context: RmqContext,
                          @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getPersonByName(payload.name);
    }

    @MessagePattern({ cmd: 'get-persons-by-name' })
    async getPersonsByName(@Ctx() context: RmqContext,
                          @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getPersonsByName(payload.name);
    }

    @MessagePattern({ cmd: 'edit-person' })
    async editPerson(@Ctx() context: RmqContext,
                         @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.editPerson(payload.updatePersonDto, payload.id);
    }

    @MessagePattern({ cmd: 'delete-person' })
    async deletePerson(@Ctx() context: RmqContext,
                       @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.deletePerson(payload.id);
    }

    @MessagePattern({ cmd: 'get-all-persons-films' })
    async getAllPersonsFilms(@Ctx() context: RmqContext,
                             @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getAllPersonsFilms(payload.id);
    }

    @MessagePattern({ cmd: 'get-all-persons-films-by-profession' })
    async getAllPersonsFilmsByProfession(@Ctx() context: RmqContext,
                                         @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getAllPersonsFilmsByProfession(payload.id, payload.professionId);
    }

    @MessagePattern({ cmd: 'get-all-persons-professions' })
    async getAllPersonsProfessions(@Ctx() context: RmqContext,
                                   @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getAllPersonsProfessions(payload.id);
    }

    @MessagePattern({ cmd: 'add-film-for-person' })
    async addFilmForPerson(@Ctx() context: RmqContext,
                             @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.addFilmForPerson(payload.person, payload.film);
    }

    @MessagePattern({ cmd: 'add-profession-in-film-for-person' })
    async addProfessionInFilmForPerson(@Ctx() context: RmqContext,
                           @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.addProfessionInFilmForPerson(payload.film, payload.person, payload.profession);
    }

    @MessagePattern({ cmd: 'create-profession' })
    async createProfession(@Ctx() context: RmqContext,
                           @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.createProfession(payload.createProfessionDto);
    }

    @MessagePattern({ cmd: 'get-or-create-profession' })
    async getOrCreateProfession(@Ctx() context: RmqContext,
                             @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.getOrCreateProfession(payload.profession);
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

        return this.personService.editProfession(payload.updateProfessionDto, payload.id);
    }

    @MessagePattern({ cmd: 'delete-profession' })
    async deleteProfession(@Ctx() context: RmqContext,
                         @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.deleteProfession(payload.id);
    }

    @MessagePattern({ cmd: 'add-profession-for-person' })
    async addProfessionForPerson(@Ctx() context: RmqContext,
                                 @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.addProfessionForPerson(payload.id, payload.dto);
    }

    @MessagePattern({ cmd: 'add-professions-for-person' })
    async addProfessionsForPerson(@Ctx() context: RmqContext,
                                  @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.personService.addProfessionsForPerson(payload.person, payload.professions);
    }

}