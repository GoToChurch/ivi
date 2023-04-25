import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {RegistrationDto} from "../../../auth_reg/src/users/USER_DTO/registrationDto";
import {UserUpdateDto} from "../../../auth_reg/src/users/USER_DTO/userUpdateDto";
import {AddRoleToUserDTO} from "../../../auth_reg/src/users/USER_DTO/addRoleDto";
import {Current_user_or_admin_guard, Roles, RolesGuard} from "@lib/global";


@Controller("/users")
export class UsersGatewayApiController {
    constructor(@Inject("USERS") private readonly usersClient: ClientProxy) {
    }

    @Post()
    async createUser(@Body() dto: RegistrationDto) {
        const role = ['USER']
        return this.usersClient.send({cmd: "user_registration"}, {dto, role});
    };

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    async getAllUsers() {
        return this.usersClient.send({cmd: "get_all_users"}, {});
    };

    @UseGuards(Current_user_or_admin_guard)
    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return this.usersClient.send({cmd: "get_user_by_id"}, {id});

    };

    @UseGuards(Current_user_or_admin_guard)
    @Post("/email")
    async getUserByEmail(@Body() email: string) {
        return this.usersClient.send({cmd: "get_user_by_email"}, {email});
    };

    @UseGuards(Current_user_or_admin_guard)
    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() dto: UserUpdateDto) {
        return this.usersClient.send({cmd: "update_user"}, {dto, id});
    };


    @UseGuards(Current_user_or_admin_guard)
    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return this.usersClient.send({cmd: "delete_user"}, {id});
    };

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post("/addrole")
    async addRoleToUser(@Body() dto: AddRoleToUserDTO) {
        try {
            return this.usersClient.send({cmd: "add_role_to_user"}, {dto});
        } catch (err) {
            return {message: `Такой роли нет или она уже есть у данного пользователя`}
        }
    }

    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post("/deleterole")
    async deleteRoleFromUser(@Body() dto: AddRoleToUserDTO) {
        try {
            return this.usersClient.send({cmd: "delete_role_from_user"}, {dto});
        } catch (err) {
            return {message: `Такой роли нет или её нет у данного пользователя`}
        }
    }
}
