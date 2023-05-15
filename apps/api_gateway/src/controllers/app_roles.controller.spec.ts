import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppRolesController} from "./app_roles.controller";


describe('Testing UserController', () => {
    let controller: AppRolesController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppRolesController],
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
                        name: 'ROLES',
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

        controller = module.get<AppRolesController>(AppRolesController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createRoles method", () => {
        const dto = {
            value: "USER",
            description: "Пользователь"
        };
        const spy = jest.spyOn(controller, "createRoles");
        controller.createRoles(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllRoles method", () => {
        const spy = jest.spyOn(controller, "getAllRoles");
        controller.getAllRoles();
        expect(spy).toHaveBeenCalled()
    })

    it("calling getRoleById method", () => {
        const id = "1";
        const spy = jest.spyOn(controller, "getRoleById");
        controller.getRoleById(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getRoleByValue method", () => {
        const value = "USER";
        const spy = jest.spyOn(controller, "getRoleByValue");
        controller.getRoleByValue(value);
        expect(spy).toHaveBeenCalled()
    })

    it("calling updateRole method", () => {
        const dto = {
            value: "USER",
            description: "Пользователь"
        };
        const id = "1";
        const spy = jest.spyOn(controller, "updateRole");
        controller.updateRole(id, dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteRole method", () => {
        const id = "1";
        const spy = jest.spyOn(controller, "deleteRole");
        controller.deleteRole(id);
        expect(spy).toHaveBeenCalled()
    })
});