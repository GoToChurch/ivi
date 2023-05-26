import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {FilmGenres, Genre} from "@app/common";
import {GenreService} from "../src/genre.service";


describe('Testing GenreService', () => {
    let service: GenreService;

    const mockGenreService = {
        genre: jest.fn(() => Genre),
        create: jest.fn(dto => {
        }),
        findOne: jest.fn(id => {
        }),
        findAll: jest.fn(),
        findByPk: jest.fn(id => {
        }),
        update: jest.fn((dto, id) => {
        }),
        destroy: jest.fn(id => true),
    }

    const mockFilmGenresService = {}

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                GenreService, {
                    provide: getModelToken(Genre),
                    useValue: mockGenreService
                }, {
                    provide: getModelToken(FilmGenres),
                    useValue: mockFilmGenresService
                }
            ],
        }).compile();

        service = app.get<GenreService>(GenreService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("calling createGenre method", () => {
        const spy = jest.spyOn(service, "createGenre");
        const dto = {
            name: "someName",
            englishName: "someName"
        }
        service.createGenre(dto);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getAllGenres method", () => {
        const spy = jest.spyOn(service, "getAllGenres");
        service.getAllGenres();
        expect(spy).toHaveBeenCalled();
    })

    it("calling getGenreByName method", () => {
        const spy = jest.spyOn(service, "getGenreByName");
        const name = "someName";
        service.getGenreByName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getGenreById method", () => {
        const spy = jest.spyOn(service, "getGenreById");
        const id = 1;
        service.getGenreById(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getGenreByEnglishName method", () => {
        const spy = jest.spyOn(service, "getGenreByEnglishName");
        const englishName = "horror";
        service.getGenreByEnglishName(englishName);
        expect(spy).toHaveBeenCalled();
    })

    it("calling editGenre method", () => {
        const spy = jest.spyOn(service, "editGenre");
        const dto = {
            name: "someName"
        };
        const id = 1;
        service.editGenre(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteGenre method", () => {
        const spy = jest.spyOn(service, "deleteGenre");
        const id = 1;
        service.deleteGenre(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getIdsByGenresNames method", () => {
        const spy = jest.spyOn(service, "getIdsByGenresNames");
        const genres = [];
        service.getIdsByGenresNames(genres);
        expect(spy).toHaveBeenCalled();
    })
});