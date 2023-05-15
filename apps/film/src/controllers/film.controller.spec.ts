import {Test, TestingModule} from '@nestjs/testing';
import {FilmController} from './film.controller';
import {FilmService} from '../services/film.service';
import {RmqContext} from "@nestjs/microservices";

describe('FilmController', () => {
    let controller: FilmController;

    const mockFilmService = {
        getAllFilms: jest.fn(),
        createFilm: jest.fn(payload => {}),
        getFilmById: jest.fn(id => {}),
        getFilmsByName: jest.fn(name => {}),
        getAllPersons: jest.fn(id => {}),
        editFilm: jest.fn((name, id) => {}),
        deleteFilm: jest.fn(id => {}),
        filterFilms: jest.fn(dto => {})
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [FilmController],
            providers: [FilmService],
        }).overrideProvider(FilmService).useValue(mockFilmService).compile();

        controller = app.get<FilmController>(FilmController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling getAllFilms method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllFilms");
        controller.getAllFilms(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling createFilm method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createFilm");
        controller.createFilm(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getFilm method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getFilm");
        controller.getFilm(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getFilmsByName method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getFilmsByName");
        controller.getFilmsByName(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllPersons method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllPersons");
        controller.getAllPersons(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editFilm method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "editFilm");
        controller.editFilm(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteFilm method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deleteFilm");
        controller.deleteFilm(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    //it("calling filterFilm method", () => {
    //    const payload = {};
    //    let context: RmqContext;
    //    const spy = jest.spyOn(controller, "filterFilm");
    //    controller.filterFilm(context, payload);
    //    expect(spy).toHaveBeenCalled()
    //})
});
