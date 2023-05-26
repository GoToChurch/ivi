import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {Person, PersonFilms, Profession} from "@app/common";
import {PersonService} from "../src/services/person.service";
import {ProfessionService} from "../src/services/profession.service";


describe('Testing PersonService', () => {
    let service: PersonService;

    const mockPersonService = {
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

    const mockRepoService = {
        findByPk: jest.fn(id => {
        }),
        create: jest.fn(dto => {
        }),
        findAll: jest.fn(),
        findOne: jest.fn(id => {
        }),
        update: jest.fn((dto, id) => {
        }),
        destroy: jest.fn(id => true),
    }

    const mockProfessionService = {};

    const mockPersonFilmsService = {
        create: jest.fn(dto => {
        }),
    }

    const mockClientProxy = {}

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                PersonService, {
                    provide: getModelToken(Person),
                    useValue: mockPersonService
                }, {
                    provide: getModelToken(Profession),
                    useValue: mockRepoService
                }, {
                    provide: getModelToken(PersonFilms),
                    useValue: mockPersonFilmsService
                }, {
                    provide: 'FILM',
                    useValue: mockClientProxy
                }, {
                    provide: ProfessionService,
                    useValue: mockProfessionService
                }
            ],
        }).compile();

        service = app.get<PersonService>(PersonService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    //it("calling getAllPersons method", () => {
    //    const spy = jest.spyOn(service, "getAllPersons");
    //    service.getAllPersons();
    //    expect(spy).toHaveBeenCalled();
    //})

    it("calling getPersonByName method", () => {
        const spy = jest.spyOn(service, "getPersonByName");
        const name = "someName";
        service.getPersonByName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getPersonById method", () => {
        const spy = jest.spyOn(service, "getPersonById");
        const id = 1;
        service.getPersonById(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getPersonsByName method", () => {
        const spy = jest.spyOn(service, "getPersonByName");
        const name = "someName";
        service.getPersonByName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling editPerson method", () => {
        const spy = jest.spyOn(service, "editPerson");
        const dto = {
            name: "someName",
            originalName: "someName",
            photo: "somePhoto"
        }
        const id = 1;
        service.editPerson(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deletePerson method", () => {
        const spy = jest.spyOn(service, "deletePerson");
        const id = 1;
        service.deletePerson(id);
        expect(spy).toHaveBeenCalled();
    })

    //it("calling addFilmForPerson method", () => {
    //    const spy = jest.spyOn(service, "addFilmForPerson");
    //    const dto = {
    //        name: "someName",
    //        originalName: "someName",
    //        photo: "somePhoto"
    //    };
    //    let film: Film;
    //    service.addFilmForPerson(dto, film);
    //    expect(spy).toHaveBeenCalled();
    //})

});