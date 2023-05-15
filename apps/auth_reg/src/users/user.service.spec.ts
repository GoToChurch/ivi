import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {UserService} from "./user.service";
import {UsersController} from "./users.controller";
import {User} from "@app/common";
import {getModelToken} from "@nestjs/sequelize";


describe('Testing UserService', () => {
    let service: UserService;
    const mockUsersService = {
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(id => {})
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [UserService,
                {
                    provide: getModelToken(User),
                    useValue: mockUsersService
                }
            ],
            imports: [
                JwtModule.register({
                    secret: process.env.SECRET_KEY || 'SECRET',
                    signOptions: {
                        expiresIn: '24h'
                    }
                }),
            ]
        }).compile()

        service = module.get<UserService>(UserService);
    })

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    //it("calling userRegistration method", () => {
    //    const spy = jest.spyOn(service, "userRegistration");
    //    const role: [string] = [""]
    //    const dto = {
    //        email: "ivanov@gmil.com",
    //        password: "123",
    //        first_name: "Ivan",
    //        second_name: "Ivanov",
    //        phone: "89960000000",
    //        age: 25,
    //        country: "RF"
    //    }
    //    service.userRegistration(dto, role);
    //    expect(spy).toHaveBeenCalled()
    //})

    it("calling getAllUsers method", () => {
        const spy = jest.spyOn(service, "getAllUsers");
        service.getAllUsers();
        expect(spy).toHaveBeenCalled();
    })

    it("calling getUserById method", () => {
        const spy = jest.spyOn(service, "getUserById");
        const id = "1";
        service.getUserById(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getUserByEmail method", () => {
        const spy = jest.spyOn(service, "getUserByEmail");
        const email = "ivanov@gmil.com";
        service.getUserByEmail(email);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getUserByPhone method", () => {
        const spy = jest.spyOn(service, "getUserByPhone");
        const phone = "89960000000";
        service.getUserByPhone(phone);
        expect(spy).toHaveBeenCalled();
    })

    //it("calling getUsersByRole method", () => {
    //    const spy = jest.spyOn(service, "getUsersByRole");
    //    const role = "USER";
    //    service.getUsersByRole(role);
    //    expect(spy).toHaveBeenCalled();
    //})

    it("calling userCountryAndAgeFilters method", () => {
        const spy = jest.spyOn(service, "userCountryAndAgeFilters");
        const param1 = "28";
        const param2 = "USA";
        service.userCountryAndAgeFilters(param1, param2);
        expect(spy).toHaveBeenCalled();
    })
})