import {Controller} from "@nestjs/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {GenreService} from "./genre.service";


@Controller()
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @MessagePattern({ cmd: "create-genre" })
    async createGenre(@Ctx() context: RmqContext,
                       @Payload() payload) {
        return this.genreService.createGenre(payload.createGenreDto);
    }

    @MessagePattern({ cmd: "get-or-create-genre" })
    async getOrCreateGenre(@Ctx() context: RmqContext,
                           @Payload() payload) {
        return this.genreService.getOrCreateGenre(payload.createGenreDto);
    }

    @MessagePattern({ cmd: "get-all-genres" })
    async getAllGenres(@Ctx() context: RmqContext) {
        return this.genreService.getAllGenres();
    }

    @MessagePattern({ cmd: "get-genre" })
    async getGenre(@Ctx() context: RmqContext,
                    @Payload() payload) {
        return this.genreService.getGenreById(payload.id);
    }

    @MessagePattern({ cmd: "get-genre-by-name" })
    async getGenreByName(@Ctx() context: RmqContext,
                         @Payload() payload) {
        return this.genreService.getGenreByName(payload.name);
    }

    @MessagePattern({ cmd: "edit-genre" })
    async editGenre(@Ctx() context: RmqContext,
                     @Payload() payload) {
        return this.genreService.editGenre(payload.updateGenreDto, payload.id);
    }

    @MessagePattern({ cmd: "delete-genre" })
    async deleteGenre(@Ctx() context: RmqContext,
                       @Payload() payload) {
        return this.genreService.deleteGenre(payload.id);
    }

    @MessagePattern({cmd: "get-films-ids-by-genres"})
    async getFilmsIdsByGenres(@Ctx() context: RmqContext,
                                 @Payload() payload) {
        return this.genreService.getFilmsIdsByGenres(payload.genres);
    }

    @MessagePattern({cmd: "add-genre-in-map"})
    async addGenreInMap(@Ctx() context: RmqContext,
                              @Payload() payload) {
        return this.genreService.addGenreInMap(payload.createGenreDto);
    }
}