import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {Review} from "@app/common";
import {ReviewService} from "../src/review.service";


describe('Testing PersonService', () => {
    let service: ReviewService;

    const mockReviewService = {
        create: jest.fn(dto => {
        }),
        findOne: jest.fn(id => {
        }),
        findAll: jest.fn(),
        findByPk: jest.fn(id => {
        }),
        update: jest.fn((dto, id) => {
        }),
        destroy: jest.fn(id => true),
        createReview: jest.fn().mockImplementation((dto: {
            title: "comment",
            text: 'Any text'
        }, filmId: number = 2, userId: number = 3, parentId?: number) => {
            let review: Review;
            if (parentId) {
                review.filmId = filmId;
                review.userId = userId;
                review.parentId = 3;
                review.title = dto.title;
                review.text = dto.text
                return review
                //return {
                //    id: 1,
                //    title: "comment",
                //    text: 'Any text',
                //    filmId: 2,
                //    userId: 3,
                //    parentId: 3
                //}
            }
            //return {
            //    id: 1,
            //    title: "comment",
            //    text: 'Any text',
            //    filmId: 2,
            //    userId: 3
            //}
            review.filmId = filmId;
            review.userId = userId;
            review.parentId = 3;
            review.title = dto.title;
            review.text = dto.text;
            return review;
        })
    };

    const mockClientProxy = {
        //send: jest.fn()
    };

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                ReviewService, {
                    provide: getModelToken(Review),
                    useValue: mockReviewService
                }, {
                    provide: 'USERS',
                    useValue: mockClientProxy
                }
            ],
        }).compile();

        service = app.get<ReviewService>(ReviewService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined()
    })

    //it("calling createReview method", () => {
    //    const spy = jest.spyOn(mockReviewService, "createReview");
    //    const dto = {
    //        title: "comment",
    //        text: 'Any text'
    //    };
    //    const filmId = 2;
    //    const userId = 3;
    //    const parentId = 3;
    //    mockReviewService.createReview(dto, filmId, userId, parentId)
    //    //service.createReview(dto, filmId, userId, parentId);
    //    expect(service).toHaveBeenCalled()
    //    //expect(spy).toHaveBeenCalled();
    //})

    it("calling getAllReviews method", () => {
        const spy = jest.spyOn(service, "getAllReviews");
        service.getAllReviews();
        expect(spy).toHaveBeenCalled();
    })

    it("calling getReviewById method", () => {
        const spy = jest.spyOn(service, "getReviewById");
        const id = 1;
        service.getReviewById(id);
        expect(spy).toHaveBeenCalled();
    })

    it("calling editReview method", () => {
        const spy = jest.spyOn(service, "editReview");
        const id = 1;
        const dto = {
            title: "comment",
            text: 'Any text'
        }
        service.editReview(dto, id);
        expect(spy).toHaveBeenCalled();
    })

    //it("calling deleteReview method", () => {
    //    const spy = jest.spyOn(service, "deleteReview");
    //    const id = 1;
    //    const userId = 1;
    //    service.deleteReview(id, userId);
    //    expect(spy).toHaveBeenCalled();
    //})
});