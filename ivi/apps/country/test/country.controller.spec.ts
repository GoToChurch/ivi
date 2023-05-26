import {Test, TestingModule} from '@nestjs/testing';
import {RmqContext} from "@nestjs/microservices";
import {CountryController} from "../src/country.controller";
import {CountryService} from "../src/country.service";


describe('Testing CountryController', () => {
    let controller: CountryController;

    const mockCountryService = {
        getAllCountries: jest.fn(),
        createCountry: jest.fn(payload => {}),
        getCountryById: jest.fn(id => {}),
        getCountryByName: jest.fn(name => {}),
        getOrCreateCounty: jest.fn(payload => {}),
        editCountry: jest.fn((dto, id) => {}),
        deleteCountry: jest.fn(id => {}),
        getFilmsIdsByCountries: jest.fn(countries => {}),
    }
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CountryController],
            providers: [CountryService],
        }).overrideProvider(CountryService).useValue(mockCountryService).compile();

        controller = app.get<CountryController>(CountryController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createCountry method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createCountry");
        controller.createCountry(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllCountries method", () => {
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllCountries");
        controller.getAllCountries(context);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getCountry method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getCountry");
        controller.getCountry(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getCountryByName method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getCountryByName");
        controller.getCountryByName(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getOrCreateCounty method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getOrCreateCounty");
        controller.getOrCreateCounty(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editCountry method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "editCountry");
        controller.editCountry(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteCountry method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deleteCountry");
        controller.deleteCountry(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getFilmsIdsByCountries method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getFilmsIdsByCountries");
        controller.getFilmsIdsByCountries(context, payload);
        expect(spy).toHaveBeenCalled()
    })
});
