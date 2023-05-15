import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppFilmsController} from "./app_films.controller";
import {AppService} from "../app.service";


describe('Testing UserController', () => {
    let controller: AppFilmsController;


    const mockAppService = {
        addFiltersToFilterObject: jest.fn()
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppFilmsController],
            providers: [AppService],
            imports: [
                JwtModule.register({
                    secret: process.env.SECRET_KEY || 'SECRET',
                    signOptions: {
                        expiresIn: '24h'
                    }
                }),
                ClientsModule.register([
                    {
                        name: 'FILM',
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
        }).overrideProvider(AppService).useValue(mockAppService).compile()

        controller = module.get<AppFilmsController>(AppFilmsController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined();
    })

    it("calling createFilm method", () => {
        const dto = {
            name: "Мама",
            originalName: "Mother",
            poster: "Poster",
            trailer: "Trailer",
            mpaaRating: "G",
            rating: 7,
            ratingsNumber: 8,
            year: 1999,
            duration: 168,
            description: "Some description"
        };
        const spy = jest.spyOn(controller, "createFilm");
        controller.createFilm(dto);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getAllFilms method", () => {
        const query = {}
        const spy = jest.spyOn(controller, "getAllFilms");
        controller.getAllFilms(query);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getFilm method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getFilm");
        controller.getFilm(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getFilmsByName method", () => {
        const name =  "Мама"
        const spy = jest.spyOn(controller, "getFilmsByName");
        controller.getFilmsByName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling editFilm method", () => {
        const name =  "Мама"
        const id = 1;
        const spy = jest.spyOn(controller, "editFilm");
        controller.editFilm(name, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteFilm method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "deleteFilm");
        controller.deleteFilm(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling filterFilmWithOneFilter method", () => {
        const filter = {};
        const query = {};
        const spy = jest.spyOn(controller, "filterFilmWithOneFilter");
        controller.filterFilmWithOneFilter(filter, query);
        expect(spy).toHaveBeenCalled();
    })

    it("calling filterFilmWithTwoFilters method", () => {
        const filter1 = {};
        const filter2 = {};
        const query = {};
        const spy = jest.spyOn(controller, "filterFilmWithTwoFilters");
        controller.filterFilmWithTwoFilters(filter1, filter2, query);
        expect(spy).toHaveBeenCalled();
    })

    it("calling filterFilmWithThreeFilters method", () => {
        const filter1 = {};
        const filter2 = {};
        const filter3 = {};
        const query = {};
        const spy = jest.spyOn(controller, "filterFilmWithThreeFilters");
        controller.filterFilmWithThreeFilters(filter1, filter2, filter3, query);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addDirector method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addDirector");
        controller.addDirector(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addActor method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addActor");
        controller.addActor(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addWriter method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addWriter");
        controller.addWriter(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addProducer method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addProducer");
        controller.addProducer(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addCinematography method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addCinematography");
        controller.addCinematography(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addMusician method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addMusician");
        controller.addMusician(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addDesigner method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addDesigner");
        controller.addDesigner(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addEditor method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addEditor");
        controller.addEditor(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addCountry method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addCountry");
        controller.addCountry(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addAward method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addAward");
        controller.addAward(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addRelatedFilm method", () => {
        const dto = {
            id: 1
        };
        const id = 2;
        const spy = jest.spyOn(controller, "addRelatedFilm");
        controller.addRelatedFilm(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getAllPersonsByFilm method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getAllPersonsByFilm");
        controller.getAllPersonsByFilm(id);
        expect(spy).toHaveBeenCalled();
    })
});