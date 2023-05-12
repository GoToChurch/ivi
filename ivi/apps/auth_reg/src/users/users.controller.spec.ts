import {UsersController} from "./users.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, RmqContext, Transport} from "@nestjs/microservices";
import {getModelToken} from "@nestjs/sequelize";
import {UserService} from "./user.service";
import {User} from "@app/common/models/users_model/user.model";

describe('Testing UserController', () => {
    let controller: UsersController;

    const mockProfileService = {
        findAll: jest.fn(),
        //update: jest.fn().mockImplementation((dto) => ({...dto})),
        findOne: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(({'where':{'id': undefined}}) => {}),
        hash: jest.fn(password => {}),
        update: jest.fn((dto:{'where': {'id': 1}}) => {}),
        filter: jest.fn(users => users)
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [UserService, {
                provide: getModelToken(User),
                useValue: mockProfileService
            }
            ],
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
        }).compile()

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

    //it("calling registration method", () => {
    //    let context: RmqContext;
    //    const dto = {
    //        email: 'stepanov@gmail.com',
    //        password: '123',
    //        first_name: 'Stepan',
    //        second_name: 'Stepanov',
    //        phone: '89045674321',
    //        age: 42,
    //        country: 'USA'
    //    }
    //    const spy = jest.spyOn(controller, "registration");
    //    controller.registration(context, dto);
    //    expect(spy).toHaveBeenCalled();
    //    expect(spy.mock.calls).toHaveLength(1);
    //})


    it("calling getUserById method", () => {
        let context: RmqContext;
        const user_id = {
            id: 1
        }
        const spy = jest.spyOn(controller, "getUserById");
        controller.getUserById(context, user_id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls).toHaveLength(1);
    })
//
    //it("calling updateUser method", () => {
    //    let context: RmqContext;
    //    const payload = {
    //        id: 1,
    //        DTO: {
    //            email: 'email@mail.ru',
    //            password: '123',
    //            first_name: 'Stepan',
    //            second_name: 'Stepanov',
    //            phone: '89045674321',
    //            age: 42,
    //            country: 'USA'
    //        }
    //    }
    //    const spy = jest.spyOn(controller, "updateUser");
    //    controller.updateUser(context, payload);
    //    expect(spy).toHaveBeenCalled();
    //    expect(spy.mock.calls).toHaveLength(1);
        //expect(controller.updateUser(context, payload)).resolves.toEqual({
        //    user_id: 2,
        //    email: 'email@mail.ru',
        //    password: '123',
        //    first_name: 'Stepan',
        //    second_name: 'Stepanov',
        //    phone: '89045674321',
        //    age: 42,
        //    country: 'USA'
        //});
    //})
//
    it("calling getUserByEmail method", async () => {
        let context: RmqContext;
        const payload = {
            email: 'email@mail.ru'
        }
        const profileDTO = {
            id: 1,
            user_id: 2,
            first_name: 'Stepan',
            second_name: 'Stepanov',
            phone: '89045674321',
            age: 42,
            country: 'USA'
        }
        const spy = jest.spyOn(controller, "getUserByEmail");
        await controller.getUserByEmail(context, payload);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls).toHaveLength(1);

    })

    it("calling getUserByPhone method", async () => {
        let context: RmqContext;
        const payload = {
            phone: '89960000000'
        }
        const profileDTO = {
            id: 1,
            user_id: 2,
            first_name: 'Stepan',
            second_name: 'Stepanov',
            phone: '89045674321',
            age: 42,
            country: 'USA'
        }
        const spy = jest.spyOn(controller, "getUserByPhone");
        await controller.getUserByPhone(context, payload);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.calls).toHaveLength(1);
    })

    it("calling getUsersByRole method", async () => {
        let context: RmqContext;
        const payload = {
            role: 'ADMIN'
        }
        const profileDTO = {
            id: 1,
            user_id: 2,
            first_name: 'Stepan',
            second_name: 'Stepanov',
            phone: '89045674321',
            age: 42,
            country: 'USA'
        }
        const spy = jest.spyOn(controller, "getUsersByRole");
        await controller.getUsersByRole(context, payload);
        expect(spy).toHaveBeenCalled()
        expect(spy.mock.calls).toHaveLength(1);
    })

    //it("calling  userCountryAndAgeFilters method", async () => {
    //    let context: RmqContext;
    //    const payload = {
    //        value1: 'Anything',
    //        value2: 'Anything'
    //    }
    //    const profileDTO = {
    //        id: 1,
    //        user_id: 2,
    //        first_name: 'Stepan',
    //        second_name: 'Stepanov',
    //        phone: '89045674321',
    //        age: 42,
    //        country: 'USA'
    //    }
    //    const spy = jest.spyOn(controller, "userCountryAndAgeFilters");
    //    await controller.userCountryAndAgeFilters(context, payload);
    //    expect(spy).toHaveBeenCalled()
//
    //})
//
    //it("calling  userCountryOrAgeFilter method", async () => {
    //    let context: RmqContext;
    //    const payload = {
    //        value: 'Anything',
    //    }
    //    const profileDTO = {
    //        id: 1,
    //        user_id: 2,
    //        first_name: 'Stepan',
    //        second_name: 'Stepanov',
    //        phone: '89045674321',
    //        age: 42,
    //        country: 'USA'
    //    }
    //    const spy = jest.spyOn(controller, "userCountryOrAgeFilter");
    //    await controller.userCountryOrAgeFilter(context, payload);
    //    expect(spy).toHaveBeenCalled()
//
    //})
//
    //it("calling  deleteUser method", async () => {
    //    let context: RmqContext;
    //    const payload = {
    //        id: 1,
    //    }
//
    //    const spy = jest.spyOn(controller, "deleteUser");
    //    await controller.deleteUser(context, payload);
    //    expect(spy).toHaveBeenCalled()
//
    //})

})