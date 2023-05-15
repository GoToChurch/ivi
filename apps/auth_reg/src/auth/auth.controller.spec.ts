import {AuthController} from "./auth.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {AuthService} from "./auth.service";
import {RmqContext} from "@nestjs/microservices";


describe('Testing UserController', () => {
    let controller: AuthController;

    const mockAuthService = {
        login: jest.fn(payload => payload)
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [AuthService],
            imports: [
                JwtModule.register({
                    secret: process.env.SECRET_KEY || 'SECRET',
                    signOptions: {
                        expiresIn: '24h'
                    }
                })
            ]
        }).overrideProvider(AuthService).useValue(mockAuthService).compile()

        controller = module.get<AuthController>(AuthController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling login method", () => {
        let context: RmqContext;
        const payload = {};
        const spy = jest.spyOn(controller, "login");
        controller.login(context, payload);
        expect(spy).toHaveBeenCalled()

    })
});