import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppGenresController} from "./app_genres.controller";


describe('Testing UserController', () => {
    let controller: AppGenresController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppGenresController],
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
                        name: 'GENRE',
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

        controller = module.get<AppGenresController>(AppGenresController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createGenre method", () => {
        const dto = {
            name: "Ужасы",
            englishName: "Horror"
        };
        const spy = jest.spyOn(controller, "createGenre");
        controller.createGenre(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllGenres method", () => {
        const spy = jest.spyOn(controller, "getAllGenres");
        controller.getAllGenres();
        expect(spy).toHaveBeenCalled()
    })

    it("calling getGenre method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getGenre");
        controller.getGenre(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editGenre method", () => {
        const dto = {
            name: "Ужасы",
            englishName: "Horror"
        };
        const id = 1;
        const spy = jest.spyOn(controller, "editGenre");
        controller.editGenre(dto, id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteGenre method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "deleteGenre");
        controller.deleteGenre(id);
        expect(spy).toHaveBeenCalled()
    })
});