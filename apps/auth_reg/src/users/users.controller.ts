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

    @MessagePattern({cmd: "user_registration"})
    async registration(@Ctx() context: RmqContext, @Payload() payload) {
        return await this.userService.userRegistration(payload.dto, payload.role);
    }

    @MessagePattern({cmd: "get_all_users"})
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return users;
    }

    @MessagePattern({cmd: "get_user_by_id"})
    async getUserById(@Ctx() context: RmqContext,
                      @Payload() payload) {
        const user = await this.userService.getUserById(payload.id);
        return user;
    }

    @MessagePattern({cmd: "get_user_by_email"})
    async getUserByEmail(@Ctx() context: RmqContext,
                         @Payload() payload) {
        console.log(payload)
        const user = await this.userService.getUserByEmail(payload.email);
        return user;
    }

    @MessagePattern({cmd: "get_user_by_phone"})
    async getUserByPhone(@Ctx() context: RmqContext,
                         @Payload() payload) {
        const user = await this.userService.getUserByPhone(payload.number);
        return user;
    }

    @MessagePattern({cmd: "get_users_by_role"})
    async getUsersByRole(@Ctx() context: RmqContext,
                         @Payload() payload) {
        console.log(payload)
        const users = await this.userService.getUsersByRole(payload.role);
        return users;
    }

    @MessagePattern({cmd: "get_users_by_params"})
    async userCountryAndAgeFilters(@Ctx() context: RmqContext,
                               @Payload() payload) {
        return await this.userService.UserCountryAndAgeFilters(payload.value1, payload.value2)
    }

    @MessagePattern({cmd: "get_users_by_param"})
    async userCountryOrAgeFilter(@Ctx() context: RmqContext,
                                   @Payload() payload) {
        return await this.userService.UserCountryOrAgeFilter(payload.value)
    }

    @MessagePattern({cmd: "update_user"})
    async updateUser(@Ctx() context: RmqContext,
                     @Payload() payload) {
        //this.globalService.acknowledgeMessage(context)
        const user = await this.userService.updateUser(payload.dto, payload.id);
        return user;
    }

    @MessagePattern({cmd: "delete_user"})
    async deleteUser(@Ctx() context: RmqContext,
                     @Payload() payload) {
        //this.globalService.acknowledgeMessage(context)
        const user = await this.userService.deleteUser(payload.id);
        return user;
    }

    @MessagePattern({cmd: "add_role_to_user"})
    async addRoleToUser(@Ctx() context: RmqContext,
                        @Payload() payload) {
        const role_value = payload['dto']['value'];
        const result = await this.rolesClient.send({cmd: "get_role_by_value"}, {role_value});
        if (result) {
            result.subscribe(async (v) => {
                await this.userService.addRoleToUser(payload['dto']['user_id'], v.value);
            })
            return result;
        }
        return {message: `Роли ${role_value} нет или она уже есть у данного пользователя`}
    }


    @MessagePattern({cmd: "delete_role_from_user"})
    async deleteRoleFromUser(@Ctx() context: RmqContext,
                             @Payload() payload) {
        const role_value = payload['dto']['value'];
        const user_id = payload['dto']['user_id'];
        const user = await this.userService.deleteRoleFromUser(user_id, role_value);
        return user;
    }

    @MessagePattern({cmd: "add_review_to_user"})
    async addReviewToUser(@Ctx() context: RmqContext,
                        @Payload() payload) {
        const token_user = await this.userService.InspectUserToken(payload["token"]);
        if (payload['parent_id']) {
            console.log('c parent')
            const review = await this.userService.createIdToUserReview(payload['dto'], token_user['id'],
                payload['film_id'], payload['parent_id']);
            await this.userService.addReviewToUser(token_user["id"], review.id);
            return this.reviewsClient.send({cmd: "create_review"}, {review});
        }
        console.log('без parent')
        const review = await this.userService.createIdToUserReview(payload['dto'], token_user['id'], payload['film_id']);
        console.log(review)
        await this.userService.addReviewToUser(token_user["id"], review.id);
        return this.reviewsClient.send({cmd: "create_review"}, {review});
    }

    @MessagePattern({cmd: "delete_review_from_user"})
    async deleteReviewToUser(@Ctx() context: RmqContext,
                          @Payload() payload) {
        console.log(payload['review_id'])
        const id = payload['review_id'];
        await this.userService.deleteReviewFromUser(payload['id'], payload['review_id']);
        return this.reviewsClient.send({cmd: "delete-review"}, {id});
    }
}
