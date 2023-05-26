import {Test, TestingModule} from '@nestjs/testing';
import {RmqContext} from "@nestjs/microservices";
import {GenreController} from "../src/genre.controller";
import {GenreService} from "../src/genre.service";

describe('Testing GenreController', () => {
    let controller: GenreController;

    const mockGenreService = {
        getAllGenres: jest.fn(),
        createGenre: jest.fn(payload => {}),
        getGenreById: jest.fn(id => {}),
        getGenreByName: jest.fn(name => {}),
        editGenre: jest.fn((dto, id) => {}),
        deleteGenre: jest.fn(id => {}),
        getFilmsIdsByGenres: jest.fn(genres => {}),
        getOrCreateGenre: jest.fn(dto => {})
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [GenreController],
            providers: [GenreService],
        }).overrideProvider(GenreService).useValue(mockGenreService).compile();

        controller = app.get<GenreController>(GenreController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling getAllGenres method", () => {
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllGenres");
        controller.getAllGenres(context);
        expect(spy).toHaveBeenCalled()
    })

    it("calling createGenre method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createGenre");
        controller.createGenre(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getGenre method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getGenre");
        controller.getGenre(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getGenreByName method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getGenreByName");
        controller.getGenreByName(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editGenre method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "editGenre");
        controller.editGenre(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteGenre method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deleteGenre");
        controller.deleteGenre(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getFilmsIdsByGenres method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getFilmsIdsByGenres");
        controller.getFilmsIdsByGenres(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getOrCreateGenre method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getOrCreateGenre");
        controller.getOrCreateGenre(context, payload);
        expect(spy).toHaveBeenCalled()
    })
});
