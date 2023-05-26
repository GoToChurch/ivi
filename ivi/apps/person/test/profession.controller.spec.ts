import {Test, TestingModule} from '@nestjs/testing';
import {RmqContext} from "@nestjs/microservices";
import {ProfessionController} from "../src/controllers/profession.controller";
import {ProfessionService} from "../src/services/profession.service";



describe('Testing PersonController', () => {
    let controller: ProfessionController;

    const mockProfessionService = {
        createProfession: jest.fn(payload => {}),
        getOrCreateProfession: jest.fn(payload => {}),
        getAllProfessions: jest.fn(),
        getProfessionById: jest.fn(id => {}),
        getProfessionByName: jest.fn(name => {}),
        editProfession: jest.fn((dto, id) => true),
        deleteProfession: jest.fn(id => true)
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ProfessionController],
            providers: [
                {
                    provide: ProfessionService,
                    useValue: mockProfessionService
                }
            ],
        }).compile();

        controller = app.get<ProfessionController>(ProfessionController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createProfession method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createProfession");
        controller.createProfession(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getOrCreateProfession method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getOrCreateProfession");
        controller.getOrCreateProfession(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllProfession method", () => {
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllProfession");
        controller.getAllProfession(context);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getProfession method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getProfession");
        controller.getProfession(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getProfessionByName method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getProfessionByName");
        controller.getProfessionByName(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editProfession method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "editProfession");
        controller.editProfession(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteProfession method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deleteProfession");
        controller.deleteProfession(context, payload);
        expect(spy).toHaveBeenCalled()
    })
});
