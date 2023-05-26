import {Test, TestingModule} from "@nestjs/testing";
import {JwtService} from "@nestjs/jwt";
import {AddRoleDto, RegistrationDto, Review, UpdateUserDto, User, UserRoles} from "@app/common";
import {getModelToken} from "@nestjs/sequelize";
import {UserService} from "../src/users/user.service";



describe('Testing UserService', () => {
    let service: UserService;

    let user: User;
    let review: Review

    const mockUsersService = {
        userRegistration: jest.fn((dto: RegistrationDto, role= 'USER') => {
            return {...user, id: 1, email: dto.email,
                password: dto.password,
                first_name: dto.first_name,
                second_name: dto.second_name,
                phone: dto.phone,
                age: dto.age,
                country: dto.country
            }
        }),
        getAllUsers: jest.fn(() => []),
        getUserById: jest.fn((id = 1) => {
            return {...user, id: id}
        }),
        getUserByEmail: jest.fn((email = "ivanov@gmil.com") => {
            return {...user, email: email}
        }),
        getUserByPhone: jest.fn((phone = "89960000000") => {
            return {...user, phone: phone}
        }),
        getUsersByRole: jest.fn((role = "USER") => {
            return {...user, role: role}
        }),
        UserCountryAndAgeFilters: jest.fn((param1 = "28", param2= "USA") => {
            return {...user, age: param1, country: param2}
        }),
        updateUser: jest.fn((dto: UpdateUserDto, id= 1) => {
            return {...user, id: id, email: dto.email,
                password: dto.password,
                first_name: dto.first_name,
                second_name: dto.second_name,
                phone: dto.phone,
                age: dto.age,
                country: dto.country,
                refreshToken: dto.refreshToken
            }
        }),
        deleteUser: jest.fn((id = 1) => {
            return true;
        }),
        deleteReviewFromUser: jest.fn((reviewId: 2, id: 1) => {
            return true;
        }),
        addReviewToUser: jest.fn((review:Review, id: 1) => {}),
        inspectUserToken: jest.fn(),
        getAllUsersReviews: jest.fn((id = 1) => {
            return []
        }),
        deleteRoleFromUser: jest.fn((dto: AddRoleDto) => {
            return true
        })
    };

    const mockUsersRepo = {}

    const mockJwtService = {}

    const mockUserRolesRepo = {}

    const mockClientProxy = {}

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [UserService, {
                    provide: UserService,
                    useValue: mockUsersService
                }, {
                    provide: getModelToken(User),
                    useValue: mockUsersRepo
                }, {
                    provide: JwtService,
                    useValue: mockJwtService
                }, {
                    provide: getModelToken(UserRoles),
                    useValue: mockUserRolesRepo
                }, {
                    provide: "ROLES",
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

    it("calling userRegistration method", () => {
        const spy = jest.spyOn(service, "userRegistration");
        const role= "USER"
        const dto = {
            email: "ivanov@gmil.com",
            password: "123",
            first_name: "Ivan",
            second_name: "Ivanov",
            phone: "89960000000",
            age: 25,
            country: "RF"
        }
        service.userRegistration(dto, role);
        expect(spy).toHaveBeenCalled()
        expect(spy.mock.results[0].value).toEqual(service.userRegistration(dto, role))
    })

    it("calling getAllUsers method", () => {
        const spy = jest.spyOn(service, "getAllUsers");
        service.getAllUsers();
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllUsers())
    })

    it("calling getUserById method", () => {
        const spy = jest.spyOn(service, "getUserById");
        const id = 1;
        service.getUserById(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getUserById(id))
    })

    it("calling getUserByEmail method", () => {
        const spy = jest.spyOn(service, "getUserByEmail");
        const email = "ivanov@gmil.com";
        service.getUserByEmail(email);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getUserByEmail(email))
    })

    it("calling getUserByPhone method", () => {
        const spy = jest.spyOn(service, "getUserByPhone");
        const phone = "89960000000";
        service.getUserByPhone(phone);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getUserByPhone(phone))
    })

    it("calling getUsersByRole method", () => {
        const spy = jest.spyOn(service, "getUsersByRole");
        const role = "USER";
        service.getUsersByRole(role);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getUsersByRole(role))
    })

    it("calling UserCountryAndAgeFilters method", () => {
        const spy = jest.spyOn(service, "UserCountryAndAgeFilters");
        const param1 = "28";
        const param2 = "USA";
        service.UserCountryAndAgeFilters(param1, param2);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.UserCountryAndAgeFilters(param1, param2))
    })

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
        expect(spy.mock.results[0].value).toEqual(service.updateUser(dto, id));
    })

    it("calling deleteUser method", () => {
        const spy = jest.spyOn(service, "deleteUser");
        const id = 1;
        service.deleteUser(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deleteUser(id));
    })

    it("calling inspectUserToken method", () => {
        const spy = jest.spyOn(service, "inspectUserToken");
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwiZW1haWwiOiJncmVnb3J5MDUxMTE5ODRAZ21haWwu" +
            "Y29tIiwicGhvbmUiOiI4OTAwMDAwMDAwNSIsInJvbGVzIjpbIlNVUEVSVVNFUiJdLCJpYXQiOjE2ODQxMzgzMTQsImV4cCI6MTY4NDc0M" +
            "zExNH0.7l_GD9DAGqUvXCmclMnHTLSbCvF_TuKbBkEDy6pheF0";
        service.inspectUserToken(token);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteReviewFromUser", () => {
        const spy = jest.spyOn(service, "deleteReviewFromUser");
        const id = 1;
        const review_id = 2;
        service.deleteReviewFromUser(id, review_id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deleteReviewFromUser(id, review_id));
    })

    it("calling addReviewToUser method", () => {
        const spy = jest.spyOn(service, "addReviewToUser");
        const id = 1;
        let review: Review;
        service.addReviewToUser(review, id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.addReviewToUser(review, id));
    })

    it("calling getAllUsersReviews method", () => {
        const spy = jest.spyOn(service, "addReviewToUser");
        const id = 1;
        service.getAllUsersReviews(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteRoleFromUser method", () => {
        const spy = jest.spyOn(service, "addReviewToUser");
        const dto = {
            userId: 1,
            value: 'USER'
        }
        service.deleteRoleFromUser(dto);
        expect(spy).toHaveBeenCalled();
    })
})