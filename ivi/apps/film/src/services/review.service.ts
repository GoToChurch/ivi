import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";

import {CreateReviewDto, Review, UpdateReviewDto} from "@app/common";


@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review) private reviewRepository: typeof Review) {}

    async createReview(createReviewDto: CreateReviewDto, filmId, userId, parentId?) {
        const review = await this.reviewRepository.create(createReviewDto);

        review.filmId = filmId;
        review.userId = userId

        if (parentId) {
            review.parentId = parentId;
        }

        await review.save();

        return review;
    }

    async getAllReviews() {
        return await this.reviewRepository.findAll();
    }


    async getReviewById(id: number) {
        return await this.reviewRepository.findByPk(id, {
            include: {
                all: true
            }
        });
    }

    async editReview(updateReviewDto: UpdateReviewDto, id: number) {
        await this.reviewRepository.update({...updateReviewDto}, {
            where: {
                id
            }
        });

        return this.getReviewById(id);
    }

    async deleteReview(id: number) {
        return await this.reviewRepository.destroy({
            where: {
                id
            }
        });
    }
}