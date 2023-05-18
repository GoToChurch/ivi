import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UserService} from "../users/user.service";
import {JwtService} from "@nestjs/jwt";


describe('Testing AuthService', () => {
    let service: AuthService;
    const loginDto = {}

    const mockAuthService = {
        validateUser: jest.fn(dto => {
            const passwordEquals = true
            const user = {
                email: "ivanov@gmil.com",
                password: "123"
            }
            if (user && passwordEquals) {
                return user
            }

        }),
        generateToken: jest.fn(user => {
        })
    }


    const mockUserService = {
        getUserByEmail: jest.fn(email => {
            const user = {
                email: email,
                password: "123"
            }
            return user
        }),
        validateUser: jest.fn((dto:{email: "ivanov@gmil.com", password: "123"})=> {
            const user = {
                email: "ivanov@gmil.com",
                password: "123"
            }
            return user
        }),
        generateToken: jest.fn(user => {
        })


    }

    const mockJwtService = {}

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: mockUserService
                },
                {
                    provide: JwtService,
                    useValue: mockJwtService
                },

                //{
                //    provide: AuthService,
                //    useValue: mockAuthService
                //},
//
            ],
        }).compile();

        service = app.get<AuthService>(AuthService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    //it("calling login method", () => {
    //    const spy = jest.spyOn(service, "login");
    //    const dto = {
    //        email: "ivanov@gmil.com",
    //        password: "123"
    //    }
    //    service.login(dto);
    //    expect(spy).toHaveBeenCalled();

    //})


});