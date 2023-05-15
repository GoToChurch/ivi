import {Controller, Inject} from '@nestjs/common';
import {UserService} from './user.service';
import {ClientProxy, Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";



@Controller()
export class UsersController {
    constructor(private readonly userService: UserService,
                @Inject("ROLES") private readonly rolesClient: ClientProxy,
                @Inject("REVIEWS") private readonly reviewsClient: ClientProxy
                ) {
    }

    @MessagePattern({cmd: "user-registration"})
    async registration(@Ctx() context: RmqContext, @Payload() payload) {
        return await this.userService.userRegistration(payload.dto, payload.role);
    }

    @MessagePattern({cmd: "get-all-users"})
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return users;
    }

    @MessagePattern({cmd: "get-user-by-id"})
    async getUserById(@Ctx() context: RmqContext,
                      @Payload() payload) {
        const user = await this.userService.getUserById(payload.id);
        return user;
    }

    @MessagePattern({cmd: "get-user-by-email"})
    async getUserByEmail(@Ctx() context: RmqContext,
                         @Payload() payload) {
        console.log(payload)
        const user = await this.userService.getUserByEmail(payload.email);
        return user;
    }

    @MessagePattern({cmd: "get-user-by-phone"})
    async getUserByPhone(@Ctx() context: RmqContext,
                         @Payload() payload) {
        const user = await this.userService.getUserByPhone(payload.number);
        return user;
    }

    @MessagePattern({cmd: "get-users-by-role"})
    async getUsersByRole(@Ctx() context: RmqContext,
                         @Payload() payload) {
        console.log(payload)
        const users = await this.userService.getUsersByRole(payload.role);
        return users;
    }

    @MessagePattern({cmd: "get-users-by-params"})
    async userCountryAndAgeFilters(@Ctx() context: RmqContext,
                               @Payload() payload) {
        return await this.userService.userCountryAndAgeFilters(payload.value1, payload.value2)
    }

    @MessagePattern({cmd: "get-users-by-param"})
    async userCountryOrAgeFilter(@Ctx() context: RmqContext,
                                   @Payload() payload) {
        return await this.userService.userCountryOrAgeFilter(payload.value)
    }

    @MessagePattern({cmd: "update-user"})
    async updateUser(@Ctx() context: RmqContext,
                     @Payload() payload) {
        //this.globalService.acknowledgeMessage(context)
        const user = await this.userService.updateUser(payload.dto, payload.id);
        return user;
    }

    @MessagePattern({cmd: "delete-user"})
    async deleteUser(@Ctx() context: RmqContext,
                     @Payload() payload) {
        //this.globalService.acknowledgeMessage(context)
        const user = await this.userService.deleteUser(payload.id);
        return user;
    }

    @MessagePattern({cmd: "add-role-to-user"})
    async addRoleToUser(@Ctx() context: RmqContext,
                        @Payload() payload) {
        const role_value = payload['dto']['value'];
        const result = await this.rolesClient.send({cmd: "get-role-by-value"}, {role_value});
        if (result) {
            result.subscribe(async (v) => {
                await this.userService.addRoleToUser(payload['dto']['user_id'], v.value);
            })
            return result;
        }
        return {message: `Роли ${role_value} нет или она уже есть у данного пользователя`}
    }


    @MessagePattern({cmd: "delete-role-from-user"})
    async deleteRoleFromUser(@Ctx() context: RmqContext,
                             @Payload() payload) {
        const role_value = payload['dto']['value'];
        const user_id = payload['dto']['user_id'];
        const user = await this.userService.deleteRoleFromUser(user_id, role_value);
        return user;
    }

    @MessagePattern({cmd: "add-review-to-user"})
    async addReviewToUser(@Ctx() context: RmqContext,
                        @Payload() payload) {
        const token_user = await this.userService.InspectUserToken(payload["token"]);
        if (payload['parent_id']) {
            const review = await this.userService.createIdToUserReview(payload['dto'], token_user['id'],
                payload['film_id'], payload['parent_id']);
            await this.userService.addReviewToUser(token_user["id"], review.id);
            return this.reviewsClient.send({cmd: "create-review"}, {review});
        }
        const review = await this.userService.createIdToUserReview(payload['dto'], token_user['id'], payload['film_id']);
        await this.userService.addReviewToUser(token_user["id"], review.id);
        return this.reviewsClient.send({cmd: "create-review"}, {review});
    }

    @MessagePattern({cmd: "delete-review-from-user"})
    async deleteReviewToUser(@Ctx() context: RmqContext,
                          @Payload() payload) {
        const id = payload['review_id'];
        await this.userService.deleteReviewFromUser(payload['id'], payload['review_id']);
        return this.reviewsClient.send({cmd: "delete-review"}, {id});
    }
}
