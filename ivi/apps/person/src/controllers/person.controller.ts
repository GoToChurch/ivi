import {Controller} from "@nestjs/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {PersonService} from "../services/person.service";


@Controller()
export class PersonController {
    constructor(private readonly personService: PersonService) {}

    @MessagePattern({ cmd: "create-person" })
    async createPerson(@Ctx() context: RmqContext,
                       @Payload() payload) {
        return this.personService.createPerson(payload.createPersonDto);
    }

    @MessagePattern({ cmd: "get-or-create-person" })
    async getOrCreatePerson(@Ctx() context: RmqContext,
                            @Payload() payload) {
        return this.personService.getOrCreatePerson(payload.createPersonDto);
    }

    @MessagePattern({ cmd: "get-all-persons" })
    async getAllPersons(@Ctx() context: RmqContext,
                        @Payload() payload) {
        return this.personService.getAllPersons(payload.query);
    }

    @MessagePattern({ cmd: "get-person-by-id" })
    async getPerson(@Ctx() context: RmqContext,
                    @Payload() payload) {
        return this.personService.getPersonById(payload.id);
    }

    @MessagePattern({ cmd: "get-person-by-name" })
    async getPersonByName(@Ctx() context: RmqContext,
                          @Payload() payload) {
        return this.personService.getPersonByName(payload.name);
    }

    @MessagePattern({ cmd: "search-persons" })
    async searchPersons(@Ctx() context: RmqContext,
                          @Payload() payload) {
        return this.personService.searchPersons(payload.query);
    }

    @MessagePattern({ cmd: "edit-person" })
    async editPerson(@Ctx() context: RmqContext,
                         @Payload() payload) {
        return this.personService.editPerson(payload.updatePersonDto, payload.id);
    }

    @MessagePattern({ cmd: "delete-person" })
    async deletePerson(@Ctx() context: RmqContext,
                       @Payload() payload) {
        return this.personService.deletePerson(payload.id);
    }

    @MessagePattern({ cmd: "get-all-persons-films" })
    async getAllPersonsFilms(@Ctx() context: RmqContext,
                             @Payload() payload) {
        return this.personService.getAllPersonsFilms(payload.id);
    }

    @MessagePattern({ cmd: "get-all-persons-films-by-profession" })
    async getAllPersonsFilmsByProfession(@Ctx() context: RmqContext,
                                         @Payload() payload) {
        return this.personService.getAllPersonsFilmsByProfession(payload.id, payload.professionId);
    }

    @MessagePattern({ cmd: "get-all-persons-professions" })
    async getAllPersonsProfessions(@Ctx() context: RmqContext,
                                   @Payload() payload) {
        return this.personService.getAllPersonsProfessions(payload.id);
    }

    @MessagePattern({ cmd: "add-film-for-person" })
    async addFilmForPerson(@Ctx() context: RmqContext,
                             @Payload() payload) {
        return this.personService.addFilmForPerson(payload.person, payload.film);
    }

    @MessagePattern({ cmd: "add-profession-in-film-for-person" })
    async addProfessionInFilmForPerson(@Ctx() context: RmqContext,
                           @Payload() payload) {
        return this.personService.addProfessionInFilmForPerson(payload.film, payload.person, payload.profession);
    }

    @MessagePattern({ cmd: "add-profession-for-person" })
    async addProfessionForPerson(@Ctx() context: RmqContext,
                                 @Payload() payload) {
        return this.personService.addProfessionForPerson(payload.id, payload.createProfessionDto);
    }

    @MessagePattern({ cmd: "add-professions-for-person" })
    async addProfessionsForPerson(@Ctx() context: RmqContext,
                                  @Payload() payload) {
        return this.personService.addProfessionsForPerson(payload.person, payload.professions);
    }
}