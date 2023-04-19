import {Controller} from "@nestjs/common";
import {CommonService} from "@app/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {GenreService} from "../services/genre.service";

@Controller()
export class GenreController {
    constructor(private readonly genreService: GenreService,
                private readonly commonService: CommonService) {}

    @MessagePattern({ cmd: 'create-genre' })
    async createGenre(@Ctx() context: RmqContext,
                       @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.genreService.createGenre(payload.createGenreDto);
    }

    @MessagePattern({ cmd: 'get-all-genres' })
    async getAllGenres(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.genreService.getAllGenres();
    }

    @MessagePattern({ cmd: 'get-genre' })
    async getGenre(@Ctx() context: RmqContext,
                    @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.genreService.getGenreById(payload.id);
    }

    @MessagePattern({ cmd: 'edit-genre' })
    async editGenre(@Ctx() context: RmqContext,
                     @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.genreService.editGenre(payload.createGenreDto, payload.id);
    }

    @MessagePattern({ cmd: 'delete-genre' })
    async deleteGenre(@Ctx() context: RmqContext,
                       @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.genreService.deleteGenre(payload.id);
    }
}