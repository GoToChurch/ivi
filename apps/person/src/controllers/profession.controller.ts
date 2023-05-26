import {Controller} from "@nestjs/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {ProfessionService} from "../services/profession.service";


@Controller()
export class ProfessionController {
    constructor(private readonly professionService: ProfessionService) {}

    @MessagePattern({ cmd: "create-profession" })
    async createProfession(@Ctx() context: RmqContext,
                           @Payload() payload) {
        return this.professionService.createProfession(payload.createProfessionDto);
    }

    @MessagePattern({ cmd: "get-or-create-profession" })
    async getOrCreateProfession(@Ctx() context: RmqContext,
                                @Payload() payload) {
        return this.professionService.getOrCreateProfession(payload.profession);
    }

    @MessagePattern({ cmd: "get-all-professions" })
    async getAllProfession(@Ctx() context: RmqContext) {
        return this.professionService.getAllProfessions();
    }

    @MessagePattern({ cmd: "get-profession" })
    async getProfession(@Ctx() context: RmqContext,
                        @Payload() payload) {
        return this.professionService.getProfessionById(payload.id);
    }

    @MessagePattern({ cmd: "get-profession-by-name" })
    async getProfessionByName(@Ctx() context: RmqContext,
                        @Payload() payload) {
        return this.professionService.getProfessionByName(payload.name);
    }

    @MessagePattern({ cmd: "edit-profession" })
    async editProfession(@Ctx() context: RmqContext,
                         @Payload() payload) {
        return this.professionService.editProfession(payload.updateProfessionDto, payload.id);
    }

    @MessagePattern({ cmd: "delete-profession" })
    async deleteProfession(@Ctx() context: RmqContext,
                           @Payload() payload) {
        return this.professionService.deleteProfession(payload.id);
    }
}