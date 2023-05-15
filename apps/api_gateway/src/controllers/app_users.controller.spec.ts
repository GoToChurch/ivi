import {Test, TestingModule} from "@nestjs/testing";
import {JwtModule} from "@nestjs/jwt";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppUsersController} from "./app_users.controller";


describe('Testing UserController', () => {
    let controller: AppUsersController;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppUsersController],
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
                        name: 'USERS',
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
                        name: 'FILM',
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

        controller = module.get<AppUsersController>(AppUsersController);
    })

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createUser method", () => {
        const dto = {
            email: "ivanov@gmail.com",
            password: "1123",
            first_name: "Ivan",
            second_name: "Ivanov",
            phone: "89960000000",
            age: 27,
            country: "USA"
        };
        const spy = jest.spyOn(controller, "createUser");
        controller.createUser(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllUsers method", () => {
        const spy = jest.spyOn(controller, "getAllUsers");
        controller.getAllUsers();
        expect(spy).toHaveBeenCalled()
    })

    it("calling getUserById method", () => {
        const id = "1";
        const spy = jest.spyOn(controller, "getUserById");
        controller.getUserById(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getUserByEmail method", () => {
        const email = "ivanov@gmail.com"
        const spy = jest.spyOn(controller, "getUserByEmail");
        controller.getUserByEmail(email);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getUserByPhone method", () => {
        const phone = "89960000000";
        const spy = jest.spyOn(controller, "getUserByPhone");
        controller.getUserByPhone(phone);
        expect(spy).toHaveBeenCalled()
    })

    it("calling UserCountryAndAgeFilters method", () => {
        const value1 = "45";
        const value2 = "USA";
        const spy = jest.spyOn(controller, "UserCountryAndAgeFilters");
        controller.UserCountryAndAgeFilters(value1, value2);
        expect(spy).toHaveBeenCalled()
    })

    it("calling UserCountryOrAgeFilter method", () => {
        const value = "45";
        const spy = jest.spyOn(controller, "UserCountryOrAgeFilter");
        controller.UserCountryOrAgeFilter(value);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getUsersByRole method", () => {
        const role = "USER"
        const spy = jest.spyOn(controller, "getUsersByRole");
        controller.getUsersByRole(role);
        expect(spy).toHaveBeenCalled()
    })

    it("calling updateUser method", () => {
        const dto = {
            email: "ivanov@gmail.com",
            password: "1123",
            first_name: "Ivan",
            second_name: "Ivanov",
            phone: "89960000000",
            age: 27,
            country: "USA"
        };
        const id = "1";
        const spy = jest.spyOn(controller, "updateUser");
        controller.updateUser(id, dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteUser method", () => {
        const id = "1";
        const spy = jest.spyOn(controller, "deleteUser");
        controller.deleteUser(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling addRoleToUser method", () => {
        const dto = {
            user_id: 1,
            value: "USER"
        };
        const spy = jest.spyOn(controller, "addRoleToUser");
        controller.addRoleToUser(dto);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteRoleFromUser method", () => {
        const dto = {
            user_id: 1,
            value: "USER"
        };
        const spy = jest.spyOn(controller, "deleteRoleFromUser");
        controller.deleteRoleFromUser(dto);
        expect(spy).toHaveBeenCalled()
    })

    //it("calling addReviewWithParentToUser method", () => {
    //    const dto = {
    //        title: "Comment",
    //        text: "My comment"
    //    };
    //    req: Request
    //    //const token = req.headers["authorization"].split(' ')[1]
    //    const film_id = "1";
    //    const parent_id = "2";
    //    const spy = jest.spyOn(controller, "addReviewWithParentToUser");
    //    controller.addReviewWithParentToUser(dto, req, film_id, parent_id);
    //    expect(spy).toHaveBeenCalled()
    //})

    //it("calling addReviewToUser method", () => {
    //    const dto = {
    //        title: "Comment",
    //        text: "My comment"
    //    };
    //    req: Request
    //    //const token = req.headers["authorization"].split(' ')[1]
    //    const film_id = "1";
    //    const parent_id = "2";
    //    const spy = jest.spyOn(controller, "addReviewToUser");
    //    controller.addReviewToUser(dto, req, film_id, parent_id);
    //    expect(spy).toHaveBeenCalled()
    //})

    it("calling deleteReviewFromUser method", () => {
        const id = "1";
        const review_id = "2";
        const spy = jest.spyOn(controller, "deleteReviewFromUser");
        controller.deleteReviewFromUser(id, review_id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getAllReviews method", () => {
        const spy = jest.spyOn(controller, "getAllReviews");
        controller.getAllReviews();
        expect(spy).toHaveBeenCalled()
    })

    it("calling getReview method", () => {
        const id = "1";
        const spy = jest.spyOn(controller, "getReview");
        controller.getReview(id);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editReview method", () => {
        const id = "1";
        const dto = {
            title: "Comment",
            text: "My comment"
        };
        const spy = jest.spyOn(controller, "editReview");
        controller.editReview(dto, id);
        expect(spy).toHaveBeenCalled()
    })


});