import {Test, TestingModule} from "@nestjs/testing";
import {JwtService} from "@nestjs/jwt";
import {ROLES, User, UserRoles} from "@app/common";
import {getModelToken} from "@nestjs/sequelize";
import {UserService} from "../src/users/user.service";



describe('Testing UserService', () => {
    let service: UserService;
    const mockUsersService = {
        findOne: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(id => {
        }),
        update: jest.fn((dto, id) => {}),
        destroy: jest.fn(id => true),
    };

    const mockJwtService = {
        verify: jest.fn(),
    }

    const mockUserRolesService = {}

    const mockClientProxy = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [UserService, {
                    provide: getModelToken(User),
                    useValue: mockUsersService
                }, {
                    provide: JwtService,
                    useValue: mockJwtService
                }, {
                    provide: getModelToken(UserRoles),
                    useValue: mockUserRolesService
                }, {
                    provide: ROLES,
                    useValue: mockClientProxy
                },

            ],
            imports: []
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
        const id = 1;
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

    //it("calling userCountryAndAgeFilters method", () => {
    //    const spy = jest.spyOn(service, "userCountryAndAgeFilters");
    //    const param1 = "28";
    //    const param2 = "USA";
    //    service.userCountryAndAgeFilters(param1, param2);
    //    expect(spy).toHaveBeenCalled();
    //})

    it("calling updateUser method", () => {
        const spy = jest.spyOn(service, "updateUser");
        const id = 1;
        const dto = {
            email: "ivanov@gmil.com",
            password: "123",
            first_name: "Ivan",
            second_name: "Ivanov",
            phone: "89960000000",
            age: 25,
            country: "RF",
            refreshToken: "ifhufgwhrygiureyhfuiowfjiwepfwepfwjepfiojwepofhweprfiu23547230ruweifjpsfgkosp"
        };
        service.updateUser(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteUser method", () => {
        const spy = jest.spyOn(service, "deleteUser");
        const id = 1;
        service.deleteUser(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling inspectUserToken method", () => {
        const spy = jest.spyOn(service, "inspectUserToken");
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJncmVnb3J5MDUxMTE5ODRAZ21haWwu" +
            "Y29tIiwicGhvbmUiOiI4OTAwMDAwMDAwNSIsInJvbGVzIjpbIlNVUEVSVVNFUiJdLCJpYXQiOjE2ODQxMzgzMTQsImV4cCI6MTY4NDc0M" +
            "zExNH0.7l_GD9DAGqUvXCmclMnHTLSbCvF_TuKbBkEDy6pheF0";
        service.inspectUserToken(token);
        expect(spy).toHaveBeenCalled();
    })

    //it("calling deleteReviewFromUser", () => {
    //    const spy = jest.spyOn(service, "deleteReviewFromUser");
    //    const id = 1;
    //    const review_id = 2;
    //    service.deleteReviewFromUser(id, review_id);
    //    expect(spy).toHaveBeenCalled();
    //})

    //it("calling addReviewToUser method", () => {
    //    const spy = jest.spyOn(service, "addReviewToUser");
    //    const id = 1;
    //    let review: Review;
    //    service.addReviewToUser(review, id);
    //    expect(spy).toHaveBeenCalled();
    //})
})