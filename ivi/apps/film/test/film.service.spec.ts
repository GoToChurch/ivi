import {Test, TestingModule} from '@nestjs/testing';
import {Film} from "@app/common";
import {getModelToken} from "@nestjs/sequelize";
import {FilmService} from "../src/services/film.service";


describe('Testing FilmService', () => {
    let service: FilmService;

    const mockFilmService = {
        create: jest.fn(dto => {
        }),
        findOne: jest.fn(id => {
        }),
        findAll: jest.fn(),
        findByPk: jest.fn(id => {
        }),
        update: jest.fn((dto, id) => {}),
        destroy: jest.fn(id => true),
    }

    const mockClientProxy = {
        send: jest.fn()
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                FilmService, {
                    provide: getModelToken(Film),
                    useValue: mockFilmService
                }, {
                    provide: 'PERSON',
                    useValue: mockClientProxy
                }, {
                    provide: 'GENRE',
                    useValue: mockClientProxy
                }, {
                    provide: 'AWARD',
                    useValue: mockClientProxy
                }, {
                    provide: 'COUNTRY',
                    useValue: mockClientProxy
                },
            ],
        }).compile();

        service = app.get<FilmService>(FilmService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    //it("calling getAllFilms method", () => {
    //    const spy = jest.spyOn(service, "getAllFilms");
    //    service.getAllFilms();
    //    expect(spy).toHaveBeenCalled();
    //})

    it("calling getFilmById method", () => {
        const spy = jest.spyOn(service, "getFilmById");
        const id = 1;
        service.getFilmById(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling editFilm method", () => {
        const spy = jest.spyOn(service, "editFilm");
        const dto = {
            name: "SomeName"
        }
        const id = 1;
        service.editFilm(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteFilm method", () => {
        const spy = jest.spyOn(service, "deleteFilm");
        const id = 1;
        service.deleteFilm(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getFilmByName method", () => {
        const spy = jest.spyOn(service, "getFilmByName");
        const name = "Живые и мёртвые";
        service.getFilmByName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getFilmByNameAndOriginalName method", () => {
        const spy = jest.spyOn(service, "getFilmByNameAndOriginalName");
        const name = "Живые и мёртвые";
        const originalName = "The living and the dead"
        service.getFilmByNameAndOriginalName(name, originalName);
        expect(spy).toHaveBeenCalled();
    })


    it("calling handleQuery method", () => {
        const spy = jest.spyOn(service, "handleQuery");
        const films = {};
        const query = {}
        service.handleQuery(films, query);
        expect(spy).toHaveBeenCalled();
    })
});