import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";

import {Review} from "@app/common";
import {CreateReviewDto} from "@app/common/dto/create_review.dto";


@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review) private reviewRepository: typeof Review) {}

    async createReview(dto: CreateReviewDto, filmId, userId, parentId?) {
        console.log(dto)
        const review = await this.reviewRepository.create(dto);

        review.filmId = filmId;
        // review.userId = userId

        if (parentId) {
            review.parentId = parentId;
        }

        review.save();

        return review;
    }

    async getAllReviews() {
        return await this.reviewRepository.findAll({
            include: {
                all: true
            }
        });
    }


    async getReviewById(id: number) {
        return await this.reviewRepository.findByPk(id, {
            include: {
                all: true
            }
        });
    }

    async editReview(dto: CreateReviewDto, id: number) {
        await this.reviewRepository.update({...dto}, {
            where: {
                id
            }
        });

        return this.getReviewById(id);
    }

    async deleteReview(id: number) {
        await this.reviewRepository.destroy({
            where: {
                id
            }
        });
    }
}