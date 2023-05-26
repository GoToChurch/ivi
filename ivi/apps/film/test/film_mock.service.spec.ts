import {Test, TestingModule} from '@nestjs/testing';
import {CreateFilmDto, Film, Profession, UpdateFilmDto} from "@app/common";
import {getModelToken} from "@nestjs/sequelize";
import {FilmService} from "../src/services/film.service";


describe('Testing FilmService', () => {
    let service: FilmService;
    let film: Film;

    const mockFilmService = {
        createFilm: jest.fn((dto: CreateFilmDto) => {
            return {...film,
                id: 1,
                name: dto.name,
                originalName: dto.originalName,
                poster: dto.poster,
                trailer: dto.trailer,
                mpaaRating: dto.mpaaRating,
                rating: dto.rating,
                ratingsNumber: dto.ratingsNumber,
                year: dto.year,
                duration: dto.duration,
                description: dto.description
            }
        }),
        getAllFilms: jest.fn(() => []),
        getFilmById: jest.fn((id = 1) => {
            return {...film, id:id}
        }),
        getFilmByName: jest.fn((name = "someName") => {
            return {...film, name: name}
        }),
        getFilmsByName: jest.fn((name = "someName") => {
            return []
        }),
        getFilmByNameAndOriginalName: jest.fn((originalName = "someOriginalName") => {
            return {...film, originalName: originalName}
        }),
        filterFilms: jest.fn((genreFilter = "ужасы", yearFilter = 2000, countriesFilter = 'USA', query = {}) => {
            return {...film, genres: [genreFilter], year: yearFilter, countries: [countriesFilter]}
        }),
        filterFilmsByCountries: jest.fn((films = ['someFilm1', 'someFilm2'], countries = [1, 2]) => {
            return []
        }),
        filterFilmsByGenres: jest.fn((films: Film[], genres = [1, 2]) => {
            return []
        }),
        filterFilmsBySingleYear: jest.fn((films = ['someFilm1', 'someFilm2'], year = 2011) => {
            return []
        }),
        filterFilmsByYearInterval: jest.fn((films = ['someFilm1', 'someFilm2'], interval = '2011-2012') => {
            return []
        }),
        filterFilmsByRating: jest.fn((films = ['someFilm1', 'someFilm2'], query = {}) => {
            return []
        }),
        filterFilmsByRatingNumber: jest.fn((films = ['someFilm1', 'someFilm2'], query = {}) => {
            return []
        }),
        filterFilmsByName: jest.fn((films = ['someFilm1', 'someFilm2'], query = {}) => {
            return []
        }),
        getFilmsByPersonName: jest.fn((name = "someName") => {
            return {...film, name: name}
        }),
        editFilm: jest.fn((dto: UpdateFilmDto, id = 1) => {
            return {...film,
                id: 1,
                name: dto.name
            }
        }),
        deleteFilm: jest.fn((id = 1) => {
            return true
        }),
        getAllPersons: jest.fn((id = 1) => {
            return []
        }),
        addDirectorsForFilm: jest.fn((film: Film, directors= ['director1', 'director2']): void => {}),
        addActorsForFilm: jest.fn((film: Film, actors= ['actor1', 'actor2']): void => {}),
        addWritersForFilm: jest.fn((film: Film, writers= ['writer1', 'writer2']): void => {}),
        addProducersForFilm: jest.fn((film: Film, producers= ['producer1', 'producer2']): void => {}),
        addMusiciansForFilm: jest.fn((film: Film, musicians= ['musician1', 'musician2']): void => {}),
        addDesignersForFilm: jest.fn((film: Film, designers= ['designer1', 'designer2']): void => {}),
        addEditorsForFilm: jest.fn((film: Film, editors= ['editor1', 'editor2']): void => {}),
        addGenresForFilm: jest.fn((film: Film, genres= [1, 2]): void => {}),
        addCountriesForFilm: jest.fn((film: Film, countries= [1, 2]): void => {}),
        addAwardsForFilm: jest.fn((film: Film, awards= [1, 2]): void => {}),
        addRelatedFilmsForFilm: jest.fn((film: Film, relatedFilms= [1, 2]): void => {}),
        addInfoForPesronAndFilm: jest.fn((film: Film, persons = [1, 2], profession: Profession, professionName = 'актёр'): void => {}),
        handleQuery: jest.fn((films = ['film1', 'film2'], query = {}) => {
            return []
        }),

    }

    const mockFilmRepo = {}

    const mockClientProxy = {
        send: jest.fn()
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                FilmService, {
                    provide: FilmService,
                    useValue: mockFilmService
                }, {
                    provide: getModelToken(Film),
                    useValue: mockFilmRepo
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

    it("calling createFilm method", () => {
        const spy = jest.spyOn(service, "createFilm");
        const dto = {
            name: 'someName',
            originalName: 'someOriginalName',
            poster: 'poster',
            trailer: 'trailer',
            mpaaRating: 'G',
            rating: 33,
            ratingsNumber: 45,
            year: 2011,
            duration: 180,
            description: 'Not bad'
        }
        service.createFilm(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.createFilm(dto))
    })

    it("calling getAllFilms method", () => {
        const spy = jest.spyOn(service, "getAllFilms");
        service.getAllFilms();
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllFilms())
    })

    it("calling getFilmById method", () => {
        const spy = jest.spyOn(service, "getFilmById");
        const id = 1;
        service.getFilmById(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getFilmById(id))
    })

    it("calling editFilm method", () => {
        const spy = jest.spyOn(service, "editFilm");
        const dto = {
            name: "SomeName"
        }
        const id = 1;
        service.editFilm(dto, id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.editFilm(dto, id));
    })

    it("calling deleteFilm method", () => {
        const spy = jest.spyOn(service, "deleteFilm");
        const id = 1;
        service.deleteFilm(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deleteFilm(id));
    })

    it("calling getFilmByName method", () => {
        const spy = jest.spyOn(service, "getFilmByName");
        const name = "Живые и мёртвые";
        service.getFilmByName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getFilmByName(name));
    })

    it("calling getFilmsByName method", () => {
        const spy = jest.spyOn(service, "getFilmsByName");
        const name = "someName";
        service.getFilmsByName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getFilmsByName(name));
    })


    it("calling filterFilms method", () => {
        const spy = jest.spyOn(service, "filterFilms");
        const genreFilter = "ужасы";
        const yearFilter = 2000;
        const countriesFilter = "USA";
        const query = {};
        service.filterFilms(genreFilter, yearFilter, countriesFilter, query);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterFilms(genreFilter, yearFilter, countriesFilter, query));
    })

    it("calling filterFilmsByCountries method", () => {
        const spy = jest.spyOn(service, "filterFilmsByCountries");
        const films =['someFilm1', 'someFilm2'];
        const countries = [1, 2];
        service.filterFilmsByCountries(films, countries);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterFilmsByCountries(films, countries));
    })

    it("calling filterFilmsByGenres method", () => {
        const spy = jest.spyOn(service, "filterFilmsByGenres");
        let films: Film[];
        const genres = [1, 2];
        service.filterFilmsByGenres(films, genres);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterFilmsByGenres(films, genres));
    })

    it("calling filterFilmsBySingleYear method", () => {
        const spy = jest.spyOn(service, "filterFilmsBySingleYear");
        const films = ['someFilm1', 'someFilm2'];
        const year = 2011;
        service.filterFilmsBySingleYear(films, year);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterFilmsBySingleYear(films, year));
    })

    it("calling filterFilmsByYearInterval method", () => {
        const spy = jest.spyOn(service, "filterFilmsByYearInterval");
        const films = ['someFilm1', 'someFilm2'];
        const interval = '2011-2012';
        service.filterFilmsByYearInterval(films, interval);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterFilmsByYearInterval(films, interval));
    })

    it("calling filterFilmsByRating method", () => {
        const spy = jest.spyOn(service, "filterFilmsByRating");
        const films = ['someFilm1', 'someFilm2'];
        const query = {};
        service.filterFilmsByRating(films, query);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterFilmsByRating(films, query));
    })

    it("calling filterFilmsByRatingNumber method", () => {
        const spy = jest.spyOn(service, "filterFilmsByRatingNumber");
        const films = ['someFilm1', 'someFilm2'];
        const query = {};
        service.filterFilmsByRatingNumber(films, query);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterFilmsByRatingNumber(films, query));
    })

    it("calling filterFilmsByName method", () => {
        const spy = jest.spyOn(service, "filterFilmsByName");
        const films = ['someFilm1', 'someFilm2'];
        const query = {};
        service.filterFilmsByName(films, query);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.filterFilmsByName(films, query));
    })

    it("calling getFilmsByPersonName method", () => {
        const spy = jest.spyOn(service, "getFilmsByPersonName");
        const name = "someName";
        service.getFilmsByPersonName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getFilmsByPersonName(name));
    })

    it("calling getAllPersons method", () => {
        const spy = jest.spyOn(service, "getAllPersons");
        const id = 1;
        service.getAllPersons(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllPersons(id));
    })

    it("calling addDirectorsForFilm method", () => {
        const spy = jest.spyOn(service, "addDirectorsForFilm");
        let film: Film;
        const directors= ['director1', 'director2'];
        service.addDirectorsForFilm(film, directors);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addDirectorsForFilm(film, directors));
    })

    it("calling addActorsForFilm method", () => {
        const spy = jest.spyOn(service, "addActorsForFilm");
        let film: Film;
        const actors= ['actor1', 'actor2'];
        service.addActorsForFilm(film, actors);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addActorsForFilm(film, actors));
    })

    it("calling addWritersForFilm method", () => {
        const spy = jest.spyOn(service, "addWritersForFilm");
        let film: Film;
        const writers= ['writer1', 'writer2'];
        service.addWritersForFilm(film, writers);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addWritersForFilm(film, writers));
    })

    it("calling addProducersForFilm method", () => {
        const spy = jest.spyOn(service, "addProducersForFilm");
        let film: Film;
        const producers= ['producer1', 'producer2'];
        service.addProducersForFilm(film, producers);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addProducersForFilm(film, producers));
    })

    it("calling addMusiciansForFilm method", () => {
        const spy = jest.spyOn(service, "addMusiciansForFilm");
        let film: Film;
        const musicians = ['musician1', 'musician2'];
        service.addMusiciansForFilm(film, musicians);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addMusiciansForFilm(film, musicians));
    })

    it("calling addDesignersForFilm method", () => {
        const spy = jest.spyOn(service, "addDesignersForFilm");
        let film: Film;
        const designers = ['designer1', 'designer2'];
        service.addDesignersForFilm(film, designers);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addDesignersForFilm(film, designers));
    })

    it("calling addEditorsForFilm method", () => {
        const spy = jest.spyOn(service, "addEditorsForFilm");
        let film: Film;
        const editors = ['editor1', 'editor2'];
        service.addEditorsForFilm(film, editors);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addEditorsForFilm(film, editors));
    })

    it("calling addCountriesForFilm method", () => {
        const spy = jest.spyOn(service, "addCountriesForFilm");
        let film: Film;
        const countries = [1, 2];
        service.addCountriesForFilm(film, countries);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addCountriesForFilm(film, countries));
    })

    it("calling addAwardsForFilm method", () => {
        const spy = jest.spyOn(service, "addAwardsForFilm");
        let film: Film;
        const awards = [1, 2];
        service.addAwardsForFilm(film, awards);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addAwardsForFilm(film, awards));
    })

    it("calling addRelatedFilmsForFilm method", () => {
        const spy = jest.spyOn(service, "addRelatedFilmsForFilm");
        let film: Film;
        const relatedFilms = [1, 2];
        service.addRelatedFilmsForFilm(film, relatedFilms);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addRelatedFilmsForFilm(film, relatedFilms));
    })

    it("calling addInfoForPesronAndFilm method", () => {
        const spy = jest.spyOn(service, "addInfoForPesronAndFilm");
        let film: Film;
        let profession: Profession;
        const persons = [1, 2];
        const professionName = 'актёр';
        service.addInfoForPesronAndFilm(film, persons, profession, professionName);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addInfoForPesronAndFilm(film, persons, profession, professionName));
    })

    it("calling addGenresForFilm method", () => {
        const spy = jest.spyOn(service, "addGenresForFilm");
        let film: Film;
        const genres = [1, 2];
        service.addGenresForFilm(film, genres);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addGenresForFilm(film, genres));
    })

    it("calling getFilmByNameAndOriginalName method", () => {
        const spy = jest.spyOn(service, "getFilmByNameAndOriginalName");
        const name = "Живые и мёртвые";
        const originalName = "The living and the dead"
        service.getFilmByNameAndOriginalName(name, originalName);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getFilmByNameAndOriginalName(name, originalName));
    })

    it("calling handleQuery method", () => {
        const spy = jest.spyOn(service, "handleQuery");
        const films = {};
        const query = {}
        service.handleQuery(films, query);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.handleQuery(films, query));
    })
});