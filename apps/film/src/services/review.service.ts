import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";

import {Review} from "@app/common";
import {CreateReviewDto} from "@app/common";


@Injectable()
export class ReviewService {
    constructor(@InjectModel(Review) private reviewRepository: typeof Review) {
    }

    async createReview(id, dto: CreateReviewDto, filmId, userId, parentId?) {
        const new_dto = {id: id, ...dto}
        console.log(new_dto)
        const review = await this.reviewRepository.create(new_dto);

        review.userId = userId;
        review.filmId = filmId;

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
        return await this.reviewRepository.destroy({
            where: {
                id
            }
        });
    }
}