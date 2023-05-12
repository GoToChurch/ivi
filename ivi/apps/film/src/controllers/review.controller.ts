import {Controller} from "@nestjs/common";
import {CommonService} from "@app/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {ReviewService} from "../services/review.service";



@Controller()
export class ReviewController {
    constructor(private readonly reviewService: ReviewService,
                private readonly commonService: CommonService) {
    }

    @MessagePattern({cmd: 'create-review'})
    async createReview(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.reviewService.createReview(payload.createReviewDto, payload.filmId, payload.userId, payload.parentId);
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

        return this.reviewService.editReview(payload.updateReviewDto, payload.id);
    }

    @MessagePattern({cmd: 'delete-review'})
    async deleteReview(@Ctx() context: RmqContext,
                        @Payload() payload) {
        // this.commonService.acknowledgeMessage(context)

        return this.reviewService.deleteReview(payload.id);
    }

}