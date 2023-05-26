import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {CreateRoleDto, Role} from "@app/common";
import {RolesService} from "../src/roles/roles.service";


describe('Testing RolesService', () => {
    let service: RolesService;
    let role: Role;

    const mockRolesService = {
        createRole: jest.fn((dto: CreateRoleDto) => {
            return {
                ...role,
                id: 1,
                value: dto.value,
                description: dto.description
            }
        }),
        getAllRoles: jest.fn(() => []),
        getRoleByValue: jest.fn((value = 'USER') => {
            return {
                ...role,
                value: value
            }
        }),
        getRoleById: jest.fn((id = 1) => {
            return {
                ...role,
                id: id
            }
        }),
        updateRole: jest.fn((dto: CreateRoleDto, id = 1) => {
            return {
                ...role,
                id: id,
                value: dto.value,
                description: dto.description
            }
        }),

        deleteRole: jest.fn((id = 1) => {
            return true
        }),
    };

    const mockRolesRepo = {};

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                RolesService, {
                    provide: RolesService,
                    useValue: mockRolesService
                }, {
                    provide: getModelToken(Role),
                    useValue: mockRolesRepo
                }
            ],
        }).compile();

        service = app.get<RolesService>(RolesService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("calling createRole method", () => {
        const spy = jest.spyOn(service, "createRole");
        const dto = {
            value: "USER",
            description: "Пользователь"
        }
        service.createRole(dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.createRole(dto))
    })

    it("calling getAllRoles method", () => {
        const spy = jest.spyOn(service, "getAllRoles");
        service.getAllRoles();
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllRoles())
    })

    it("calling getRoleByValue method", () => {
        const spy = jest.spyOn(service, "getRoleByValue");
        const value = "USER";
        service.getRoleByValue(value);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getRoleByValue(value));
    })

    it("calling getRoleById method", () => {
        const spy = jest.spyOn(service, "getRoleById");
        const id = 1;
        service.getRoleById(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getRoleById(id));
    })

    it("calling updateRole method", () => {
        const spy = jest.spyOn(service, "updateRole");
        const dto = {
            value: "USER",
            description: "Пользователь"
        }
        const id = 1;
        service.updateRole(dto, id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.updateRole(dto, id));
    })

    it("calling deleteRole method", () => {
        const spy = jest.spyOn(service, "deleteRole");
        const id = 1;
        service.deleteRole(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deleteRole(id));
    })
});