import {Test, TestingModule} from '@nestjs/testing';
import {JwtService} from "@nestjs/jwt";
import { AuthService } from '../src/auth/auth.service';
import {AuthController} from "../src/auth/auth.controller";
import {UserService} from "../src/users/user.service";


describe('Testing AuthService', () => {
    let service: AuthService;


    const mockAuthService = {
        login: jest.fn(),
        logout: jest.fn(),
        updateRefreshToken: jest.fn(),
        getTokens: jest.fn()
    }

    const mockUserService = {}

    const mockJwtService = {}

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                {
                    provide: AuthService,
                    useValue: mockAuthService
                },
                {
                    provide: UserService,
                    useValue: mockUserService
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService
                }
            ],
        }).compile();

        service = app.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    it("calling login method", () => {
        const spy = jest.spyOn(service, "login");
        const dto = {
            email: "ivanov@gmil.com",
            password: "123"
        }
        service.login(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling logout method", () => {
        const spy = jest.spyOn(service, "logout");
        const headers = {}
        service.logout(headers);
        expect(spy).toHaveBeenCalled();
    })

    it("calling updateRefreshToken method", () => {
        const spy = jest.spyOn(service, "updateRefreshToken");
        const refreshToken = "someToken";
        const userId = '1';
        service.updateRefreshToken(refreshToken, userId);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getTokens method", () => {
        const spy = jest.spyOn(service, "getTokens");
        const userId = '1';
        const email = "ivanov@gmail.com";
        const phone = "89960000000";
        const roles = [];
        service.getTokens(userId, email, phone, roles);
        expect(spy).toHaveBeenCalled();
    })
});