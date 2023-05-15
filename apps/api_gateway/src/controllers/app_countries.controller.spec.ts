import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppCountriesController} from "./app_countries.controller";


describe('Testing UserController', () => {
    let controller: AppCountriesController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppCountriesController],
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
                        name: 'COUNTRY',
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

        controller = module.get<AppCountriesController>(AppCountriesController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createCountry method", () => {
        const dto = {
            name: "Мама",
            englishName: "Mother"
        };
        const spy = jest.spyOn(controller, "createCountry");
        controller.createCountry(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllCountries method", () => {
        const spy = jest.spyOn(controller, "getAllCountries");
        controller.getAllCountries();
        expect(spy).toHaveBeenCalled()
    })

    it("calling getCountry method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getCountry");
        controller.getCountry(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editCountry method", () => {
        const dto = {
            name: "Мама",
            englishName: "Mother"
        };
        const id = 1;
        const spy = jest.spyOn(controller, "editCountry");
        controller.editCountry(dto, id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteCountry method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "deleteCountry");
        controller.deleteCountry(id);
        expect(spy).toHaveBeenCalled()
    })
});