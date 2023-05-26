import {Test, TestingModule} from '@nestjs/testing';
import {RmqContext} from "@nestjs/microservices";
import {ReviewController} from "../src/review.controller";
import {ReviewService} from "../src/review.service";


describe('Testing PersonController', () => {
    let controller: ReviewController;

    const mockReviewService = {
        createReview: jest.fn((dto, filmId, userId, parentId) => {}),
        getAllReviews: jest.fn(),
        getReviewById: jest.fn(id => {}),
        editReview: jest.fn((dto, id) => true),
        deleteReview: jest.fn( id => true)
    }

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ReviewController],
            providers: [
                {
                    provide: ReviewService,
                    useValue: mockReviewService
                }
            ],
        }).compile();

        controller = app.get<ReviewController>(ReviewController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined()
    })

    it("calling createReview method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "createReview");
        controller.createReview(context, payload);
        expect(spy).toHaveBeenCalled()

    })

    it("calling getAllReviews method", () => {
        const payload = {};
        let context: RmqContext;
        const spy = jest.spyOn(controller, "getAllReviews");
        controller.getAllReviews(context);
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
});