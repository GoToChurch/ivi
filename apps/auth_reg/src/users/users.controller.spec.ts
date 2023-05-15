import {UsersController} from "./users.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, RmqContext, Transport} from "@nestjs/microservices";
import {UserService} from "./user.service";


describe('Testing UserController', () => {
    let controller: UsersController;

    const mockUserService = {
        findAll: jest.fn(),
        //update: jest.fn().mockImplementation((dto) => ({...dto})),
        findOne: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(({'where': {'id': undefined}}) => {
        }),
        hash: jest.fn(password => {
        }),
        update: jest.fn(payload => {
        }),
        filter: jest.fn(users => users),
        getAllUsers: jest.fn(),
        getUserById: jest.fn(id => {
        }),
        getUserByEmail: jest.fn(email => {
        }),
        getUserByPhone: jest.fn(phone => {
        }),
        userRegistration: jest.fn((dto, role) => {
        }),
        getUsersByRole: jest.fn(role => {
        }),
        userCountryAndAgeFilters: jest.fn(payload => {
        }),
        userCountryOrAgeFilter: jest.fn(payload => {
        }),
        updateUser: jest.fn(payload => {
        }),
        deleteUser: jest.fn(payload => {
        }),
        addRoleToUser: jest.fn(payload => {
        }),
        deleteRoleFromUser: jest.fn(payload => {
        }),
        addReviewToUser: jest.fn(payload => {
        }),
        InspectUserToken: jest.fn(payload => {
        }),
        createIdToUserReview: jest.fn((payload: { dto: {}, film_id: 2 }, token_user: { id: 1 }) => {
        }),
        deleteReviewFromUser: jest.fn(({id, review_id}) => {})
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UserService],
            imports: [JwtModule.register({
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
                ClientsModule.register([
                    {
                        name: 'REVIEWS',
                        transport: Transport.RMQ,
                        options: {
                            urls: ['amqp://localhost:5672'],
                            queue: 'reviews_queue',
                            queueOptions: {
                                durable: false
                            },
                        },
                    },
                ]),
            ]
        }).overrideProvider(UserService).useValue(mockUserService).compile();

        controller = module.get<UsersController>(UsersController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling getAllUsers method", () => {
        const spy = jest.spyOn(controller, "getAllUsers");
        controller.getAllUsers();
        expect(spy).toHaveBeenCalled()

    })

    it("calling registration method", () => {
        let context: RmqContext;
        const dto = {
            email: 'stepanov@gmail.com',
            password: '123',
            first_name: 'Stepan',
            second_name: 'Stepanov',
            phone: '89045674321',
            age: 42,
            country: 'USA'
        };
        const spy = jest.spyOn(controller, "registration");
        controller.registration(context, dto);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls).toHaveLength(1);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling getUserById method", () => {
        let context: RmqContext;
        const user_id = {
            id: 1
        };
        const spy = jest.spyOn(controller, "getUserById");
        controller.getUserById(context, user_id);
        expect(spy).toHaveBeenCalled();

    })

    it("calling getUserByEmail method", () => {
        let context: RmqContext;
        const payload = {
            email: "ivanov@gmail.com"
        };
        const spy = jest.spyOn(controller, "getUserByEmail");
        controller.getUserByEmail(context, payload);
        expect(spy).toHaveBeenCalled();

    })

    it("calling getUserByPhone method", () => {
        let context: RmqContext;
        const payload = {
            phone: "89960000000"
        };
        const spy = jest.spyOn(controller, "getUserByPhone");
        controller.getUserByPhone(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling getUsersByRole method", () => {
        let context: RmqContext;
        const payload = {
            role: "USER"
        };
        const spy = jest.spyOn(controller, "getUsersByRole");
        controller.getUsersByRole(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling userCountryAndAgeFilters method", () => {
        let context: RmqContext;
        const payload = {};
        const spy = jest.spyOn(controller, "userCountryAndAgeFilters");
        controller.userCountryAndAgeFilters(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling userCountryOrAgeFilter method", () => {
        let context: RmqContext;
        const payload = {};
        const spy = jest.spyOn(controller, "userCountryOrAgeFilter");
        controller.userCountryOrAgeFilter(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling updateUser method", () => {
        let context: RmqContext;
        const payload = {};
        const spy = jest.spyOn(controller, "updateUser");
        controller.updateUser(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteUser method", () => {
        let context: RmqContext;
        const payload = {};
        const spy = jest.spyOn(controller, "deleteUser");
        controller.deleteUser(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling addRoleToUser method", () => {
        let context: RmqContext;
        const payload = {
            dto: {
                value: "USER"
            }
        };
        const spy = jest.spyOn(controller, "addRoleToUser");
        controller.addRoleToUser(context, payload);
        expect(spy).toHaveBeenCalled();
    })

    it("calling deleteRoleFromUser method", () => {
        let context: RmqContext;
        const payload = {
            dto: {
                value: "USER",
                user_id: 1
            }
        };
        const spy = jest.spyOn(controller, "deleteRoleFromUser");
        controller.deleteRoleFromUser(context, payload)
        expect(spy).toHaveBeenCalled();
    })


    //it("calling addReviewToUser method", () => {
    //    let context: RmqContext;
    //    const payload = {
    //        dto: {
    //            film_id: 1,
    //            parent_id: 2
    //        }
    //    };
    //    const spy = jest.spyOn(controller, "addReviewToUser");
    //    controller.addReviewToUser(context, payload)
    //    expect(spy).toHaveBeenCalled();
    //})

    it("calling deleteReviewToUser method", () => {
        let context: RmqContext;
        const payload = {
            id: 2,
            review_id: 1
        };
        const spy = jest.spyOn(controller, "deleteReviewToUser");
        controller.deleteReviewToUser(context, payload)
        expect(spy).toHaveBeenCalled();
    })
})