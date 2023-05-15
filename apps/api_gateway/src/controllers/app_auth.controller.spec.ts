import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";

import {ClientsModule, RmqContext, Transport} from "@nestjs/microservices";
import {AppAuthController} from "./app_auth.controller";


describe('Testing UserController', () => {
    let controller: AppAuthController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppAuthController],
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
                        name: 'AUTH',
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

        controller = module.get<AppAuthController>(AppAuthController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling login method", () => {
        let context: RmqContext;
        const dto = {
            email: "ivanov@gmail.com",
            password: "123"
        }
        const spy = jest.spyOn(controller, "login");
        controller.login(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling googleLogin method", () => {
        const spy = jest.spyOn(controller, "googleLogin");
        controller.googleLogin();
        expect(spy).toHaveBeenCalled()
    })

    it("calling vkLogin method", () => {
        const spy = jest.spyOn(controller, "vkLogin");
        controller.vkLogin();
        expect(spy).toHaveBeenCalled()
    })

    it("calling googleRedirect method", () => {
        const spy = jest.spyOn(controller, "googleRedirect");
        controller.googleRedirect();
        expect(spy).toHaveBeenCalled()
    })

    it("calling vkRedirect method", () => {
        const spy = jest.spyOn(controller, "vkRedirect");
        controller.vkRedirect();
        expect(spy).toHaveBeenCalled()
    })


});