import {Test, TestingModule} from '@nestjs/testing';
import {RmqContext} from "@nestjs/microservices";
import {PersonController} from "../src/controllers/person.controller";
import {PersonService} from "../src/services/person.service";


describe('Testing PersonController', () => {
    let controller: PersonController;

    const mockPersonService = {
        getAllPersons: jest.fn(query => {
        }),
        createPerson: jest.fn(payload => {
        }),
        getOrCreatePerson: jest.fn(payload => {
        }),
        getPersonById: jest.fn(id => {
        }),
        getPersonByName: jest.fn(name => {
        }),
        getPersonsByName: jest.fn(name => {
        }),
        editPerson: jest.fn((dto, id) => {
        }),
        deletePerson: jest.fn(id => {
        }),
        getAllPersonsFilms: jest.fn(id => {
        }),
        getAllPersonsFilmsByProfession: jest.fn((id, professionId) => {
        }),
        getAllPersonsProfessions: jest.fn(id => {
        }),
        addFilmForPerson: jest.fn((person, film) => {
        }),
        addProfessionInFilmForPerson: jest.fn((person, film, profession) => {
        }),
        createProfession: jest.fn(payload => {
        }),
        getOrCreateProfession: jest.fn(profession => {
        }),
        getAllProfessions: jest.fn(),
        getProfessionById: jest.fn(id => {
        }),
        editProfession: jest.fn((dto, id) => {
        }),
        deleteProfession: jest.fn(id => {
        }),
        addProfessionForPerson: jest.fn((dto, id) => {
        }),
        addProfessionsForPerson: jest.fn((person, professions) => {
        }),
        searchPersons: jest.fn(payload => {})
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [PersonController],
            providers: [PersonService],
        }).overrideProvider(PersonService).useValue(mockPersonService).compile();

        controller = app.get<PersonController>(PersonController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling getAllPersons method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllPersons");
        controller.getAllPersons(context, payload);
        expect(spy).toHaveBeenCalled()

    })

    it("calling createPerson method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createPerson");
        controller.createPerson(context, payload);
        expect(spy).toHaveBeenCalled()

    })

    it("calling getOrCreatePerson method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getOrCreatePerson");
        controller.getOrCreatePerson(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getPerson method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getPerson");
        controller.getPerson(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getPersonByName method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getPersonByName");
        controller.getPersonByName(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling searchPersons method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "searchPersons");
        controller.searchPersons(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editPerson method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "editPerson");
        controller.editPerson(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deletePerson method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deletePerson");
        controller.deletePerson(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllPersonsFilms method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllPersonsFilms");
        controller.getAllPersonsFilms(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllPersonsFilmsByProfession method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllPersonsFilmsByProfession");
        controller.getAllPersonsFilmsByProfession(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllPersonsProfessions method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllPersonsProfessions");
        controller.getAllPersonsProfessions(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling addFilmForPerson method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "addFilmForPerson");
        controller.addFilmForPerson(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling addProfessionInFilmForPerson method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "addProfessionInFilmForPerson");
        controller.addProfessionInFilmForPerson(context, payload);
        expect(spy).toHaveBeenCalled()
    })
});
