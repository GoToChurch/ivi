import { Test, TestingModule } from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {AwardService} from "../src/award.service";
import {AwardController} from "../src/award.controller";
import {ClientsModule, RmqContext, Transport} from "@nestjs/microservices";


describe('Award controller tests', () => {
    let app: INestApplication;
    let context: RmqContext;
    let payload = {};
    let controller: AwardController;
    let mockAward;

    const mockAwardService = {
        create: jest.fn().mockReturnValue(mockAward),
        findOne: jest.fn().mockReturnValue(mockAward),
        findAll: jest.fn().mockReturnValue([mockAward]),
        findByPk: jest.fn(id => {}).mockReturnValue(mockAward),
        update: jest.fn(),
        destroy: jest.fn(),
        createAward: jest.fn(createAwardDto => {}),
        getOrCreateAward: jest.fn(createAwardDto => {}),
        getAllAwards: jest.fn(),
        getAwardById: jest.fn(id => {}),
        getAwardByNameAndYear: jest.fn((name, year) => {}),
        editAward: jest.fn((updateAwardDto, id) => {}),
        deleteAward: jest.fn(id => {}),
        addFilmAndNominationsForAward: jest.fn()
    }

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AwardController],
            providers: [AwardService],
            imports: [
                ClientsModule.register([
                    {
                        name: 'AWARD',
                        transport: Transport.RMQ,
                        options: {
                            urls: ['amqp://localhost:5672'],
                            queue: 'award_queue',
                            queueOptions: {
                                durable: false
                            },
                        },
                    },
                ]),
            ]
        }).overrideProvider(AwardService).useValue(mockAwardService).compile();

        controller = module.get<AwardController>(AwardController);
    });

    beforeEach(() => {
        mockAward = {
            name: "Оскар",
            year: 2023
        }
    })

    it('create award test', () => {
      const spy = jest.spyOn(controller, "createAward");
      controller.createAward(context, mockAward);
      expect(spy).toHaveBeenCalled();
    });

    it('get or create award test', () => {
        const spy = jest.spyOn(controller, "getOrCreateAward");
        controller.getOrCreateAward(context, mockAward);
        expect(spy).toHaveBeenCalled();
    });

    it('get all awards test', () => {
        const spy = jest.spyOn(controller, "getAllAwards");
        controller.getAllAwards(context);
        expect(spy).toHaveBeenCalled();
    });

    it('get award by id test', () => {
        const spy = jest.spyOn(controller, "getAward");
        controller.getAward(context, payload);
        expect(spy).toHaveBeenCalled();
    });

    it('get award by name and year test', () => {
        const spy = jest.spyOn(controller, "getAwardByNameAndYear");
        controller.getAwardByNameAndYear(context, payload);
        expect(spy).toHaveBeenCalled();
    });

    it('edit award by id test', () => {
        const spy = jest.spyOn(controller, "editAward");
        controller.editAward(context, mockAward);
        expect(spy).toHaveBeenCalled();
    });


    it('delete award by id test', () => {
        const spy = jest.spyOn(controller, "deleteAward");
        controller.deleteAward(context, payload);
        expect(spy).toHaveBeenCalled();
    });

    it('add film and nominations for award', () => {
        const spy = jest.spyOn(controller, "addFilmAndNominationsForAward");
        controller.addFilmAndNominationsForAward(context, payload);
        expect(spy).toHaveBeenCalled();
    });

});

