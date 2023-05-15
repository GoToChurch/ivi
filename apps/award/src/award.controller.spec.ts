import {Test, TestingModule} from '@nestjs/testing';
import {AwardController} from './award.controller';
import {AwardService} from './award.service';
import {RmqContext} from "@nestjs/microservices";

describe('AwardController', () => {
    let controller: AwardController;

    const mockAwardService = {
        getAllAwards: jest.fn(),
        createAward: jest.fn(payload => {}),
        getAwardById: jest.fn(id => {}),
        getAwardByName: jest.fn(),
        editAward: jest.fn((dto, id) => {}),
        deleteAward: jest.fn(id => {}),
        createNomination: jest.fn(payload => {}),
        getAllNominations: jest.fn(),
        getNominationById: jest.fn(id => {}),
        editNomination: jest.fn((payload, id) => {}),
        deleteNomination: jest.fn(id => {}),
        getOrCreateAward: jest.fn(payload => {}),
        addFilmAndNominationsForAward: jest.fn((film, award, nominations) => {})
    }
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AwardController],
            providers: [AwardService],
        }).overrideProvider(AwardService).useValue(mockAwardService).compile();

        controller = app.get<AwardController>(AwardController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createAward method", () => {
        let context: RmqContext;
        const payload = {}
        const spy = jest.spyOn(controller, "createAward");
        controller.createAward(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllAwards method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllAwards");
        controller.getAllAwards(context);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAward method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAward");
        controller.getAward(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAwardByName method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAwardByName");
        controller.getAwardByName(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editAward method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "editAward");
        controller.editAward(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteAward method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deleteAward");
        controller.deleteAward(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling createNomination method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createNomination");
        controller.createNomination(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllNominations method", () => {
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllNominations");
        controller.getAllNominations(context);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getNomination method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getNomination");
        controller.getNomination(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editNomination method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "editNomination");
        controller.editNomination(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteNomination method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deleteNomination");
        controller.deleteNomination(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getOrCreateAward method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getOrCreateAward");
        controller.getOrCreateAward(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling addFilmAndNominationsForAward method", () => {
        const payload = {}
        let context: RmqContext;
        const spy = jest.spyOn(controller, "addFilmAndNominationsForAward");
        controller.addFilmAndNominationsForAward(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    //describe('root', () => {
    //  it('should return "Hello World!"', () => {
    //    expect(awardController.getHello()).toBe('Hello World!');
    // });
    //});
});
