import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {Profession} from "@app/common";
import {ProfessionService} from "../src/services/profession.service";


describe('Testing PersonService', () => {
    let service: ProfessionService;

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

    const mockProfessionService = {
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

    const mockPersonFilmsService = {
        create: jest.fn(dto => {
        }),
    }

    const mockClientProxy = {}

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                ProfessionService, {
                    provide: getModelToken(Profession),
                    useValue: mockProfessionService
                }
            ],
        }).compile();

        service = app.get<ProfessionService>(ProfessionService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("calling createProfession method", () => {
        const spy = jest.spyOn(service, "createProfession");
        const dto = {
            name: "someName"
        }
        service.createProfession(dto);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getOrCreateProfession method", () => {
        const spy = jest.spyOn(service, "getOrCreateProfession");
        const name =  "someName";
        service.getOrCreateProfession(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getAllProfessions method", () => {
        const spy = jest.spyOn(service, "getAllProfessions");
        service.getAllProfessions();
        expect(spy).toHaveBeenCalled();
    })

    it("calling getProfessionById method", () => {
        const spy = jest.spyOn(service, "getProfessionById");
        const id = 1;
        service.getProfessionById(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getProfessionByName method", () => {
        const spy = jest.spyOn(service, "getProfessionByName");
        const name = "someName";
        service.getProfessionByName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling editProfession method", () => {
        const spy = jest.spyOn(service, "editProfession");
        const dto = {
            name: "someName"
        };
        const id = 1;
        service.editProfession(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteProfession method", () => {
        const spy = jest.spyOn(service, "deleteProfession");
        const id = 1;
        service.deleteProfession(id);
        expect(spy).toHaveBeenCalled();
    })
});