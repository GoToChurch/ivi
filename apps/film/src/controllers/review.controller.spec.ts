import {Test, TestingModule} from '@nestjs/testing';
import {FilmController} from './film.controller';
import {RmqContext} from "@nestjs/microservices";
import {ReviewController} from "./review.controller";
import {ReviewService} from "../services/review.service";


describe('FilmController', () => {
    let controller: ReviewController;

    const mockReviewService = {
        getAllReviews: jest.fn(),
        createReview: jest.fn(payload => {
        }),
        getReviewById: jest.fn(id => {
        }),
        getReview: jest.fn(id => {
        }),
        editReview: jest.fn((name, id) => {
        }),
        deleteReview: jest.fn(id => {
        })
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ReviewController],
            providers: [ReviewService],
        }).overrideProvider(ReviewService).useValue(mockReviewService).compile();

        controller = app.get<ReviewController>(ReviewService);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling getAllReviews method", () => {
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllReviews");
        controller.getAllReviews(context);
        expect(spy).toHaveBeenCalled()
    })

    it("calling createReview method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createReview");
        controller.createReview(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling getReview method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getReview");
        controller.getReview(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling editReview method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "editReview");
        controller.editReview(context, payload);
        expect(spy).toHaveBeenCalled()
    })

    it("calling deleteReview method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "deleteReview");
        controller.deleteReview(context, payload);
        expect(spy).toHaveBeenCalled()
    })
})