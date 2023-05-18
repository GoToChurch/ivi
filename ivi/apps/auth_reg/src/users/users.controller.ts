import {Controller} from "@nestjs/common";
import {UserService} from "./user.service";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";


@Controller()
export class UsersController {
    constructor(private readonly userService: UserService) {}

    @MessagePattern({cmd: "user-registration"})
    async registration(@Ctx() context: RmqContext,
                       @Payload() payload) {
        return await this.userService.userRegistration(payload.registrationDto, payload.role);
    }

    @MessagePattern({cmd: "get-all-users"})
    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    @MessagePattern({cmd: "get-user-by-id"})
    async getUserById(@Ctx() context: RmqContext,
                      @Payload() payload) {
        return await this.userService.getUserById(payload.id);
    }

    @MessagePattern({cmd: "get-user-by-email"})
    async getUserByEmail(@Ctx() context: RmqContext,
                         @Payload() payload) {
        return await this.userService.getUserByEmail(payload.email);
    }

    @MessagePattern({cmd: "get-user-by-phone"})
    async getUserByPhone(@Ctx() context: RmqContext,
                         @Payload() payload) {
        return await this.userService.getUserByPhone(payload.number);
    }

    @MessagePattern({cmd: "get-users-by-role"})
    async getUsersByRole(@Ctx() context: RmqContext,
                         @Payload() payload) {
        return await this.userService.getUsersByRole(payload.role);
    }

    @MessagePattern({cmd: "get-users-by-params"})
    async userCountryAndAgeFilters(@Ctx() context: RmqContext,
                               @Payload() payload) {
        return await this.userService.UserCountryAndAgeFilters(payload.value1, payload.value2)
    }

    @MessagePattern({cmd: "get-users-by-param"})
    async userCountryOrAgeFilter(@Ctx() context: RmqContext,
                                   @Payload() payload) {
        return await this.userService.UserCountryOrAgeFilter(payload.value)
    }

    @MessagePattern({cmd: "update-user"})
    async updateUser(@Ctx() context: RmqContext,
                     @Payload() payload) {
        return await this.userService.updateUser(payload.updateUserDto, payload.id);
    }

    @MessagePattern({cmd: "delete-user"})
    async deleteUser(@Ctx() context: RmqContext,
                     @Payload() payload) {
        return await this.userService.deleteUser(payload.id);
    }

    @MessagePattern({cmd: "add-role-to-user"})
    async addRoleToUser(@Ctx() context: RmqContext,
                        @Payload() payload) {
        return await this.userService.addRoleToUser(payload.addRoleDto);
    }


    @MessagePattern({cmd: "delete-role-from-user"})
    async deleteRoleFromUser(@Ctx() context: RmqContext,
                             @Payload() payload) {
        return await this.userService.deleteRoleFromUser(payload.addRoleDto);
    }

    @MessagePattern({cmd: "add-review-to-user"})
    async addReviewToUser(@Ctx() context: RmqContext,
                        @Payload() payload) {
        return await this.userService.addReviewToUser(payload.review, payload.id);
    }

    @MessagePattern({cmd: "get-all-users-reviews"})
    async getAllUsersReviews(@Ctx() context: RmqContext,
                          @Payload() payload) {
        return await this.userService.getAllUsersReviews(payload.id);
    }

    @MessagePattern({cmd: "delete-review-from-user"})
    async deleteReviewFromUser(@Ctx() context: RmqContext,
                             @Payload() payload) {
        return await this.userService.deleteReviewFromUser(payload.reviewId, payload.id);
    }
}
