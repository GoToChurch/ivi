import {Controller} from "@nestjs/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {ReviewService} from "../services/review.service";


@Controller()
export class ReviewController {
    constructor(private readonly reviewService: ReviewService) {
    }

    @MessagePattern({cmd: 'create-review'})
    async createReview(@Ctx() context: RmqContext,
                       @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)
        const review = payload['review']
        return this.reviewService.createReview(review['id'],{title: review['title'], text: review['text']},
            review['film_id'], review['user_id'], review['parent_id']);
    }

    @MessagePattern({cmd: 'get-all-reviews'})
    async getAllReviews(@Ctx() context: RmqContext) {
        // this.commonService.acknowledgeMessage(context)

        return this.reviewService.getAllReviews();
    }

    @MessagePattern({cmd: 'get-review'})
    async getReview(@Ctx() context: RmqContext,
                    @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.reviewService.getReviewById(payload.id);
    }


    @MessagePattern({cmd: 'edit-review'})
    async editReview(@Ctx() context: RmqContext,
                     @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.reviewService.editReview(payload.createReviewDto, payload.id);
    }

    @MessagePattern({cmd: 'delete-review'})
    async deleteReview(@Ctx() context: RmqContext,
                       @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)
        return this.reviewService.deleteReview(payload.id);
    }

}