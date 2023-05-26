import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {Role} from "@app/common";
import {RolesService} from "../src/roles/roles.service";


describe('Testing RolesService', () => {
    let service: RolesService;

    const mockRolesService = {
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


    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                RolesService, {
                    provide: getModelToken(Role),
                    useValue: mockRolesService
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
    })

    it("calling getAllRoles method", () => {
        const spy = jest.spyOn(service, "getAllRoles");
        service.getAllRoles();
        expect(spy).toHaveBeenCalled();
    })

    it("calling getRoleByValue method", () => {
        const spy = jest.spyOn(service, "getRoleByValue");
        const value = "USER";
        service.getRoleByValue(value);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getRoleById method", () => {
        const spy = jest.spyOn(service, "getRoleById");
        const id = 1;
        service.getRoleById(id);
        expect(spy).toHaveBeenCalled();
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
    })

    it("calling deleteRole method", () => {
        const spy = jest.spyOn(service, "deleteRole");
        const id = 1;
        service.deleteRole(id);
        expect(spy).toHaveBeenCalled();
    })
});