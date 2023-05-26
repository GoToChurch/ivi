import {Test, TestingModule} from '@nestjs/testing';
import {Country, CreateCountryDto, FilmCountries, UpdateCountryDto} from "@app/common";
import {getModelToken} from "@nestjs/sequelize";
import {CountryService} from "../src/country.service";


describe('Testing CountryService', () => {
    let service: CountryService;
    let country: Country;

    const mockCountryService = {
        createCountry: jest.fn((dto: CreateCountryDto) => {
            return {...country, name: dto.name, englishName: dto.englishName}
        }),
        getOrCreateCounty: jest.fn((dto: CreateCountryDto) => {
            return {...country, name: dto.name, englishName: dto.englishName}
        }),
        getAllCountries: jest.fn(() => []),
        getCountryByName: jest.fn((name = "США") => {
            return {...country, name: name}
        }),
        getCountryByEnglishName: jest.fn((name = "USA") => {
            return {...country, name: name}
        }),
        getCountryById: jest.fn((id= 1) => {
            return {...country, id: id}
        }),
        editCountry: jest.fn((dto: UpdateCountryDto, id = 1) => {
            return {...country, id: id, name: dto.name, englishName: dto.englishName}
        }),
        deleteCountry: jest.fn((id= 1) => {
            return {...country, id: id}
        }),
        getFilmsIdsByCountries: jest.fn((countries = [1, 2]) => {
            return countries
        }),
        getIdsByCountriesNames: jest.fn((countries = [1, 2]) => {
            return {}
        }),
    }

    const mockCountryRepo = {}

    const mockFilmCountriesRepo = {}

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                CountryService, {
                    provide: CountryService,
                    useValue: mockCountryService
                }, {
                    provide: getModelToken(Country),
                    useValue: mockCountryRepo
                }, {
                    provide: getModelToken(FilmCountries),
                    useValue: mockFilmCountriesRepo
                },
            ],
        }).compile();

        service = app.get<CountryService>(CountryService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("calling createCountry method", () => {
        const spy = jest.spyOn(service, "createCountry");
        const dto = {
            name: "США",
            englishName: "USA"
        }
        service.createCountry(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.createCountry(dto))
    })

    it("calling getOrCreateCounty method", () => {
        const spy = jest.spyOn(service, "getOrCreateCounty");
        const dto = {
            name: "США",
            englishName: "USA"
        }
        service.getOrCreateCounty(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getOrCreateCounty(dto))
    })

    it("calling getAllCountries method", () => {
        const spy = jest.spyOn(service, "getAllCountries");
        service.getAllCountries();
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllCountries())
    })

    it("calling getCountryById method", () => {
        const spy = jest.spyOn(service, "getCountryById");
        const id = 1;
        service.getCountryById(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getCountryById(id))
    })

    it("calling getCountryByName method", () => {
        const spy = jest.spyOn(service, "getCountryByName");
        const name = "США";
        service.getCountryByName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getCountryByName(name))
    })

    it("calling editCountry method", () => {
        const spy = jest.spyOn(service, "editCountry");
        const dto = {
            name: "США",
            englishName: "USA"
        }
        const id = 1;
        service.editCountry(dto, id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.editCountry(dto, id))
    })

    it("calling deleteCountry method", () => {
        const spy = jest.spyOn(service, "deleteCountry");
        const id = 1;
        service.deleteCountry(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deleteCountry(id))
    })

    it("calling getCountryByName method", () => {
        const spy = jest.spyOn(service, "getCountryByName");
        const name = "США";
        service.getCountryByName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getCountryByName(name))
    })

    it("calling getCountryByEnglishName method", () => {
        const spy = jest.spyOn(service, "getCountryByEnglishName");
        const name = "USA";
        service.getCountryByEnglishName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getCountryByEnglishName(name))
    })

    it("calling getIdsByCountriesNames method", () => {
        const spy = jest.spyOn(service, "getIdsByCountriesNames");
        const countries = []
        service.getIdsByCountriesNames(countries);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getIdsByCountriesNames(countries))
    })

    it("calling getFilmsIdsByCountries method", () => {
        const spy = jest.spyOn(service, "getFilmsIdsByCountries");
        const countries = []
        service.getFilmsIdsByCountries(countries);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getFilmsIdsByCountries(countries))
    })
});