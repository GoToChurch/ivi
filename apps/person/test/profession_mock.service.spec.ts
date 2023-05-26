import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {CreateProfessionDto, Profession, UpdateProfessionDto} from "@app/common";
import {ProfessionService} from "../src/services/profession.service";


describe('Testing PersonService', () => {
    let service: ProfessionService;
    let profession: Profession

    const mockProfessionRepo = {}

    const mockProfessionService = {
        createProfession: jest.fn((dto: CreateProfessionDto) => {
            return {
                ...profession,
                id: 1,
                name: dto.name
            }
        }),
        getOrCreateProfession: jest.fn((dto: CreateProfessionDto) => {
            return {
                ...profession,
                id: 1,
                name: dto.name
            }
        }),
        getAllProfessions: jest.fn(() => []),
        getProfessionById: jest.fn((id = 1) => {
            return {
                ...profession,
                id: id
            }
        }),
        getProfessionByName: jest.fn((name = 'someName') => {
            return {
                ...profession,
                name: name
            }
        }),
        editProfession: jest.fn((dto: UpdateProfessionDto, id = 1) => {
            return {
                ...profession,
                id: id,
                name: dto.name
            }
        }),
        deleteProfession: jest.fn((id = 1) => {
            return true
        }),
    }


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                ProfessionService, {
                  provide: ProfessionService,
                  useValue: mockProfessionService
                }, {
                    provide: getModelToken(Profession),
                    useValue: mockProfessionRepo
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
        expect(spy.mock.results[0].value).toEqual(service.createProfession(dto))
    })

    it("calling getOrCreateProfession method", () => {
        const spy = jest.spyOn(service, "getOrCreateProfession");
        const dto = {
            name: "someName"
        }
        service.getOrCreateProfession(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getOrCreateProfession(dto))
    })

    it("calling getAllProfessions method", () => {
        const spy = jest.spyOn(service, "getAllProfessions");
        service.getAllProfessions();
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllProfessions());
    })

    it("calling getProfessionById method", () => {
        const spy = jest.spyOn(service, "getProfessionById");
        const id = 1;
        service.getProfessionById(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getProfessionById(id));
    })

    it("calling getProfessionByName method", () => {
        const spy = jest.spyOn(service, "getProfessionByName");
        const name = "someName";
        service.getProfessionByName(name);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getProfessionByName(name));
    })

    it("calling editProfession method", () => {
        const spy = jest.spyOn(service, "editProfession");
        const dto = {
            name: "someName"
        };
        const id = 1;
        service.editProfession(dto, id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.editProfession(dto, id));
    })

    it("calling deleteProfession method", () => {
        const spy = jest.spyOn(service, "deleteProfession");
        const id = 1;
        service.deleteProfession(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deleteProfession(id));
    })
});