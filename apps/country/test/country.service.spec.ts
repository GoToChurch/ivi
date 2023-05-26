import {Test, TestingModule} from '@nestjs/testing';
import {Country, FilmCountries} from "@app/common";
import {getModelToken} from "@nestjs/sequelize";
import {CountryService} from "../src/country.service";


describe('Testing CountryService', () => {
    let service: CountryService;

    const mockCountryService = {
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

    const mockFilmCountriesService = {
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

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                CountryService, {
                    provide: getModelToken(Country),
                    useValue: mockCountryService
                }, {
                    provide: getModelToken(FilmCountries),
                    useValue: mockFilmCountriesService
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
    })

    //it("calling getOrCreateAward method", () => {
    //    const spy = jest.spyOn(service, "getOrCreateAward");
    //    const dto = {
    //        name: "Oscar",
    //        year: 2015
    //    }
    //    service.getOrCreateAward(dto);
    //    expect(spy).toHaveBeenCalled();
    //})

    it("calling getAllCountries method", () => {
        const spy = jest.spyOn(service, "getAllCountries");
        service.getAllCountries();
        expect(spy).toHaveBeenCalled();
    })

    it("calling getCountryById method", () => {
        const spy = jest.spyOn(service, "getCountryById");
        const id = 1;
        service.getCountryById(id);
        expect(spy).toHaveBeenCalled();
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
    })

    it("calling deleteCountry method", () => {
        const spy = jest.spyOn(service, "deleteCountry");
        const id = 1;
        service.deleteCountry(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getCountryByName method", () => {
        const spy = jest.spyOn(service, "getCountryByName");
        const name = "США";
        service.getCountryByName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getCountryByEnglishName method", () => {
        const spy = jest.spyOn(service, "getCountryByEnglishName");
        const name = "USA";
        service.getCountryByEnglishName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getIdsByCountriesNames method", () => {
        const spy = jest.spyOn(service, "getIdsByCountriesNames");
        const countries = []
        service.getIdsByCountriesNames(countries);
        expect(spy).toHaveBeenCalled();
    })

    //it("calling getFilmsIdsByCountries method", () => {
    //    const spy = jest.spyOn(service, "getFilmsIdsByCountries");
    //    const countries = []
    //    service.getFilmsIdsByCountries(countries);
    //    expect(spy).toHaveBeenCalled();
    //})
});