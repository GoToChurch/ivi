import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {CreateGenreDto, FilmGenres, Genre, UpdateGenreDto} from "@app/common";
import {GenreService} from "../src/genre.service";


describe('Testing GenreService', () => {
    let service: GenreService;
    let genre: Genre;

    const mockGenreService = {
        createGenre: jest.fn((dto: CreateGenreDto) => {
            return {
                ...genre,
                id: 1,
                name: dto.name,
                englishName: dto.englishName
            }
        }),
        getOrCreateGenre: jest.fn((dto: CreateGenreDto) => {
            return {
                ...genre,
                id: 1,
                name: dto.name,
                englishName: dto.englishName
            }
        }),
        getAllGenres: jest.fn(() => []),
        getGenreByName: jest.fn((name = 'someName') => {
            return {
                ...genre,
                name: name
            }
        }),
        getGenreByEnglishName: jest.fn((englishName = 'someName') => {
            return {
                ...genre,
                englishName: englishName
            }
        }),
        getGenreById: jest.fn((id = 1) => {
            return {
                ...genre,
                id: id
            }
        }),
        editGenre: jest.fn((dto: UpdateGenreDto, id = 1) => {
            return {
                ...genre,
                id: id,
                name: dto.name,
            }
        }),
        deleteGenre: jest.fn((id = 1) => {
            return true
        }),
        getFilmsIdsByGenres: jest.fn((genres = [1, 2]) => {
            return []
        }),
        getIdsByGenresNames: jest.fn((genres = ['комедия', 'боевик']) => {
            return []
        }),
        addGenreInMap: jest.fn((dto: CreateGenreDto): void => {
        })
    }

    const mockGenreRepo = {}

    const mockFilmGenresRepo = {}

    beforeEach(async () => {

        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                GenreService, {
                    provide: GenreService,
                    useValue: mockGenreService
                }, {
                    provide: getModelToken(Genre),
                    useValue: mockGenreRepo
                }, {
                    provide: getModelToken(FilmGenres),
                    useValue: mockFilmGenresRepo
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
        expect(spy.mock.results[0].value).toEqual(service.createGenre(dto))
    })

    it("calling getOrCreateGenre method", () => {
        const spy = jest.spyOn(service, "getOrCreateGenre");
        const dto = {
            name: "someName",
            englishName: "someName"
        }
        service.getOrCreateGenre(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getOrCreateGenre(dto));
    })

    it("calling getAllGenres method", () => {
        const spy = jest.spyOn(service, "getAllGenres");
        service.getAllGenres();
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllGenres());
    })

    it("calling getGenreByName method", () => {
        const spy = jest.spyOn(service, "getGenreByName");
        const name = "someName";
        service.getGenreByName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getGenreByName(name));
    })

    it("calling getGenreById method", () => {
        const spy = jest.spyOn(service, "getGenreById");
        const id = 1;
        service.getGenreById(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getGenreById(id));
    })

    it("calling getGenreByEnglishName method", () => {
        const spy = jest.spyOn(service, "getGenreByEnglishName");
        const englishName = "someName";
        service.getGenreByEnglishName(englishName);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getGenreByEnglishName(englishName));
    })

    it("calling editGenre method", () => {
        const spy = jest.spyOn(service, "editGenre");
        const dto = {
            name: "someName"
        };
        const id = 1;
        service.editGenre(dto, id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.editGenre(dto, id));
    })

    it("calling deleteGenre method", () => {
        const spy = jest.spyOn(service, "deleteGenre");
        const id = 1;
        service.deleteGenre(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deleteGenre(id));
    })

    it("calling getIdsByGenresNames method", () => {
        const spy = jest.spyOn(service, "getIdsByGenresNames");
        const genres = ['комедия', 'боевик'];
        service.getIdsByGenresNames(genres);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getIdsByGenresNames(genres));
    })

    it("calling getFilmsIdsByGenres method", () => {
        const spy = jest.spyOn(service, "getFilmsIdsByGenres");
        const genres = [1, 2];
        service.getFilmsIdsByGenres(genres);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getFilmsIdsByGenres(genres));
    })

    it("calling addGenreInMap method", () => {
        const spy = jest.spyOn(service, "addGenreInMap");
        const dto = {
            name: "someName",
            englishName: "someName"
        };
        service.addGenreInMap(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addGenreInMap(dto));
    })
});