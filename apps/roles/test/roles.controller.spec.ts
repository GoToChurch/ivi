import {Test, TestingModule} from '@nestjs/testing';
import {RmqContext} from "@nestjs/microservices";
import {RolesController} from "../src/roles.controller";
import {RolesService} from "../src/roles.service";


describe('Testing RolesController', () => {
    let controller: RolesController;

    const mockRolesService = {
        getAllRoles: jest.fn(),
        createRole: jest.fn(dto => {}),
        getRoleByValue: jest.fn(value => {}),
        getRoleById: jest.fn(id => {}),
        updateRole: jest.fn((dto, id) => {}),
        deleteRole: jest.fn((id) => {})
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RolesController],
            providers: [RolesService],
        }).overrideProvider(RolesService).useValue(mockRolesService).compile();

        controller = app.get<RolesController>(RolesController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling getAllRoles method", () => {
        const spy = jest.spyOn(controller, "getAllRoles");
        controller.getAllRoles();
        expect(spy).toHaveBeenCalled();

    })

    it("calling createRole method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createRole");
        controller.createRole(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getRoleByValue method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getRoleByValue");
        controller.getRoleByValue(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getRoleById method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getRoleById");
        controller.getRoleById(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling updateRole method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "updateRole");
        controller.updateRole(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling updateRole method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "updateRole");
        controller.updateRole(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteRole method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deleteRole");
        controller.deleteRole(context, payload);
        expect(spy).toHaveBeenCalled();
    })
});
