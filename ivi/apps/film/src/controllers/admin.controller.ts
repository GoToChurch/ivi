import {Controller} from "@nestjs/common";
import {AdminService} from "../services/admin.service";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";


@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @MessagePattern({ cmd: "add-director" })
    async addDirector(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return this.adminService.addDirector(payload.id, payload.addPersonDto);
    }

    @MessagePattern({ cmd: "add-actor" })
    async addActor(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return this.adminService.addActor(payload.id, payload.addPersonDto);
    }

    @MessagePattern({ cmd: "add-producer" })
    async addProducer(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return this.adminService.addProducer(payload.id, payload.addPersonDto);
    }

    @MessagePattern({ cmd: "add-writer" })
    async addWriter(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return this.adminService.addWriter(payload.id, payload.addPersonDto);
    }

    @MessagePattern({ cmd: "add-cinematography" })
    async addCinematography(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return this.adminService.addCinematography(payload.id, payload.addPersonDto);
    }

    @MessagePattern({ cmd: "add-musician" })
    async addMusician(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return this.adminService.addMusician(payload.id, payload.addPersonDto);
    }

    @MessagePattern({ cmd: "add-designer" })
    async addDesigner(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return this.adminService.addDesigner(payload.id, payload.addPersonDto);
    }

    @MessagePattern({ cmd: "add-editor" })
    async addEditor(@Ctx() context: RmqContext,
                    @Payload() payload) {
        return this.adminService.addEditor(payload.id, payload.addPersonDto);
    }

    @MessagePattern({ cmd: "add-genre" })
    async addGenre(@Ctx() context: RmqContext,
                   @Payload() payload) {
        return this.adminService.addGenre(payload.id, payload.addGenreDto);
    }

    @MessagePattern({ cmd: "add-country" })
    async addCountry(@Ctx() context: RmqContext,
                     @Payload() payload) {
        return this.adminService.addCountry(payload.id, payload.addCountryDto);
    }

    @MessagePattern({ cmd: "add-award" })
    async addAward(@Ctx() context: RmqContext,
                   @Payload() payload) {
        return this.adminService.addAward(payload.id, payload.addAwardDto);
    }

    @MessagePattern({ cmd: "add-related-film" })
    async addRelatedFilm(@Ctx() context: RmqContext,
                         @Payload() payload) {
        return this.adminService.addRelatedFilm(payload.id, payload.addRelatedFilmDto);
    }
}