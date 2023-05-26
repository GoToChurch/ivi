import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {CreateReviewDto, Review, UpdateReviewDto} from "@app/common";
import {ReviewService} from "../src/review.service";


describe('Testing PersonService', () => {
    let service: ReviewService;
    let review: Review;

    const mockReviewService = {
        createReview: jest.fn((dto: CreateReviewDto, filmId = 1, userId = 1, parentId = 2) => {
            return {
                ...review,
                id: 1,
                title: dto.title,
                text: dto.text,
                filmId: filmId,
                userId: userId,
                parentId: parentId
            }
        }),
        getAllReviews: jest.fn(() => []),
        getReviewById: jest.fn((id = 1) => {
            return {
                ...review,
                id: 1
            }
        }),
        editReview: jest.fn((dto: UpdateReviewDto, id = 1) => {
            return {
                ...review,
                id: id,
                title: dto.title,
                text: dto.text
            }
        }),
        deleteReview: jest.fn((id = 1, userId= 1) => {
            return true
        }),
    };

    const mockReviewRepo = {};

    const mockClientProxy = {};

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [],
            providers: [
                ReviewService, {
                    provide: ReviewService,
                    useValue: mockReviewService
                }, {
                    provide: getModelToken(Review),
                    useValue: mockReviewRepo
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

    it("calling createReview method", () => {
        const spy = jest.spyOn(mockReviewService, "createReview");
        const dto = {
            title: "comment",
            text: 'Any text'
        };
        const filmId = 1;
        const userId = 1;
        const parentId = 2;
        service.createReview(dto, filmId, userId, parentId)
        expect(spy).toHaveBeenCalled()
        expect(spy.mock.results[0].value).toEqual(service.createReview(dto, filmId, userId, parentId));
    })

    it("calling getAllReviews method", () => {
        const spy = jest.spyOn(service, "getAllReviews");
        service.getAllReviews();
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getAllReviews());
    })

    it("calling getReviewById method", () => {
        const spy = jest.spyOn(service, "getReviewById");
        const id = 1;
        service.getReviewById(id);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.getReviewById(id));
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
        expect(spy.mock.results[0].value).toEqual(service.editReview(dto, id));
    })

    it("calling deleteReview method", () => {
        const spy = jest.spyOn(service, "deleteReview");
        const id = 1;
        const userId = 1;
        service.deleteReview(id, userId);
        expect(spy).toHaveBeenCalled();
        expect(spy.mock.results[0].value).toEqual(service.deleteReview(id, userId));
    })
});