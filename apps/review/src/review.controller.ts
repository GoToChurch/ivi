import {Controller} from "@nestjs/common";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {ReviewService} from "./review.service";


@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern({cmd: "create-review"})
  async createReview(@Ctx() context: RmqContext,
                     @Payload() payload) {
    return this.reviewService.createReview(payload.createReviewDto, payload.filmId, payload.userId, payload.parentId);
  }

  @MessagePattern({cmd: "get-all-reviews"})
  async getAllReviews(@Ctx() context: RmqContext) {
    console.log(1)
    return this.reviewService.getAllReviews();
  }

  @MessagePattern({cmd: "get-review"})
  async getReview(@Ctx() context: RmqContext,
                  @Payload() payload) {
    return this.reviewService.getReviewById(payload.id);
  }

  @MessagePattern({cmd: "edit-review"})
  async editReview(@Ctx() context: RmqContext,
                   @Payload() payload) {
    return this.reviewService.editReview(payload.updateReviewDto, payload.id);
  }

  @MessagePattern({cmd: "delete-review"})
  async deleteReview(@Ctx() context: RmqContext,
                     @Payload() payload) {
    return this.reviewService.deleteReview(payload.id, payload.userId);
  }
}