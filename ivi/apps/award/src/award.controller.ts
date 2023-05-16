import {Controller} from "@nestjs/common";
import {CommonService} from "@app/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {AwardService} from "./award.service";


@Controller()
export class AwardController {
    constructor(private readonly awardService: AwardService) {}

    @MessagePattern({ cmd: 'create-award' })
    async createAward(@Ctx() context: RmqContext,
                      @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.createAward(payload.createAwardDto);
    }

    @MessagePattern({ cmd: 'get-or-create-award' })
    async getOrCreateAward(@Ctx() context: RmqContext,
                           @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)
        return this.awardService.getOrCreateAward(payload.createAwardDto);
    }

    @MessagePattern({ cmd: 'get-all-awards' })
    async getAllAwards(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.getAllAwards();
    }

    @MessagePattern({ cmd: 'get-award' })
    async getAward(@Ctx() context: RmqContext,
                   @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.getAwardById(payload.id);
    }

    @MessagePattern({ cmd: 'get-award-by-name-and-year' })
    async getAwardByNameAndYear(@Ctx() context: RmqContext,
                                @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.getAwardByNameAndYear(payload.name, payload.year);
    }

    @MessagePattern({ cmd: 'edit-award' })
    async editAward(@Ctx() context: RmqContext,
                    @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.editAward(payload.updateAwardDto, payload.id);
    }

    @MessagePattern({ cmd: 'delete-award' })
    async deleteAward(@Ctx() context: RmqContext,
                      @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.deleteAward(payload.id);
    }

    @MessagePattern({ cmd: 'create-nomination' })
    async createNomination(@Ctx() context: RmqContext,
                      @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.createNomination(payload.createNominationDto);
    }

    @MessagePattern({ cmd: 'get-all-nominations' })
    async getAllNominations(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.getAllNominations();
    }

    @MessagePattern({ cmd: 'get-nomination' })
    async getNomination(@Ctx() context: RmqContext,
                   @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.getNominationById(payload.id);
    }

    @MessagePattern({ cmd: 'edit-nomination' })
    async editNomination(@Ctx() context: RmqContext,
                    @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.editNomination(payload.createNominationDto, payload.id);
    }

    @MessagePattern({ cmd: 'delete-nomination' })
    async deleteNomination(@Ctx() context: RmqContext,
                      @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.deleteNomination(payload.id);
    }

    @MessagePattern({ cmd: 'add-film-and-nominations-for-award' })
    async addFilmAndNominationsForAward(@Ctx() context: RmqContext,
                                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.awardService.addFilmAndNominationsForAward(payload.film, payload.award, payload.nominations);
    }
}