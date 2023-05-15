import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppAwardsController} from "./app_awards.controller";


describe('Testing UserController', () => {
    let controller: AppAwardsController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppAwardsController],
            providers: [],
            imports: [
                JwtModule.register({
                    secret: process.env.SECRET_KEY || 'SECRET',
                    signOptions: {
                        expiresIn: '24h'
                    }
                }),
                ClientsModule.register([
                    {
                        name: 'AWARD',
                        transport: Transport.RMQ,
                        options: {
                            urls: ['amqp://localhost:5672'],
                            queue: 'roles_queue',
                            queueOptions: {
                                durable: false
                            },
                        },
                    },
                ]),
            ]
        }).compile()

        controller = module.get<AppAwardsController>(AppAwardsController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createAward method", () => {
        const dto = {
            name: "Oscar",
            year: 1999
        };
        const spy = jest.spyOn(controller, "createAward");
        controller.createAward(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllAwards method", () => {
        const spy = jest.spyOn(controller, "getAllAwards");
        controller.getAllAwards();
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAward method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getAward");
        controller.getAward(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editAward method", () => {
        const dto = {
            name: "Oscar",
            year: 1999
        };
        const id = 1;
        const spy = jest.spyOn(controller, "editAward");
        controller.editAward(dto, id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteAward method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "deleteAward");
        controller.deleteAward(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling createNomination method", () => {
        const dto = {
            name: "Best film"
        };
        const spy = jest.spyOn(controller, "createNomination");
        controller.createNomination(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllNominations method", () => {
        const spy = jest.spyOn(controller, "getAllNominations");
        controller.getAllNominations();
        expect(spy).toHaveBeenCalled()
    })

    it("calling getNomination method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getNomination");
        controller.getNomination(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editNomination method", () => {
        const dto = {
            name: "Best film"
        };
        const id = 1;
        const spy = jest.spyOn(controller, "editNomination");
        controller.editNomination(dto, id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteNomination method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "deleteNomination");
        controller.deleteNomination(id);
        expect(spy).toHaveBeenCalled()
    })
});