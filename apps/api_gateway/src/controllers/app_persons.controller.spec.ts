import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppPersonsController} from "./app_persons.controller";


describe('Testing UserController', () => {
    let controller: AppPersonsController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppPersonsController],
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
                        name: 'PERSON',
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

        controller = module.get<AppPersonsController>(AppPersonsController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createPerson method", () => {
        const dto = {
            name: "Мама",
            originalName: "Mother",
            photo: "https://photo.img"
        };
        const spy = jest.spyOn(controller, "createPerson");
        controller.createPerson(dto);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getAllPersons method", () => {
        const query ={};
        const spy = jest.spyOn(controller, "getAllPersons");
        controller.getAllPersons(query);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getPerson method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getPerson");
        controller.getPerson(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getPersonsByName method", () => {
        const name = "Arnold";
        const spy = jest.spyOn(controller, "getPersonsByName");
        controller.getPersonsByName(name);
        expect(spy).toHaveBeenCalled();
    })

    it("calling editPerson method", () => {
        const dto = {
            name: "Мама",
            originalName: "Mother",
            photo: "https://photo.img"
        };
        const id = 1;
        const spy = jest.spyOn(controller, "editPerson");
        controller.editPerson(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getPersonsFilms method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getPersonsFilms");
        controller.getPersonsFilms(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getPersonsProfessions method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "getPersonsProfessions");
        controller.getPersonsProfessions(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getPersonsFilmsByProfession method", () => {
        const id = 1;
        const prof_id = 1;
        const spy = jest.spyOn(controller, "getPersonsFilmsByProfession");
        controller.getPersonsFilmsByProfession(id, prof_id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deletePerson method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "deletePerson");
        controller.deletePerson(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling createProfession method", () => {
        const dto = {
            name: "director"
        };
        const spy = jest.spyOn(controller, "createProfession");
        controller.createProfession(dto);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getProfession method", () => {
        const id = 1;
        const req = {};
        const spy = jest.spyOn(controller, "getProfession");
        controller.getProfession(id, req);
        expect(spy).toHaveBeenCalled();
    })

    it("calling editProfession method", () => {
        const dto = {
            name: "Режиссёр"
        };
        const id = 1;
        const spy = jest.spyOn(controller, "editProfession");
        controller.editProfession(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteProfession method", () => {
        const id = 1;
        const spy = jest.spyOn(controller, "deleteProfession");
        controller.deleteProfession(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addProfessionForPerson method", () => {
        const dto = {
            name: "director"
        };
        const spy = jest.spyOn(controller, "addProfessionForPerson");
        controller.addProfessionForPerson(dto);
        expect(spy).toHaveBeenCalled();
    })
});