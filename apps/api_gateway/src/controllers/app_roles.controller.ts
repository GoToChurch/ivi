import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {CreateRoleGTO} from "@app/common";
import {Role} from "@app/common";
import {Roles} from "@app/common";
import {RolesGuard} from "@app/common";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";


@ApiTags('Роли пользователей')
@Controller("/roles")
export class AppRolesController {
    constructor(@Inject("ROLES") private readonly rolesClient: ClientProxy) {}

    @ApiOperation({summary: 'Создать роль. Необходима роль Администратора.'})
    @ApiResponse({status: 200, type: Role})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post()
    async createRoles(@Body() dto: CreateRoleGTO) {
        return this.rolesClient.send({cmd: "role_registration"}, {dto});
    };

    @ApiOperation({summary: 'Получить все роли. Необходима роль Администратора.'})
    @ApiResponse({status: 200, type: Role})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get()
    async getAllRoles() {
        return this.rolesClient.send({cmd: "get_all_roles"}, {});
    };

    @ApiOperation({summary: 'Получить роль по id роли. Необходима роль Администратора.'})
    @ApiResponse({status: 200, type: Role})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get(":id")
    async getRoleById(@Param("id") id: string) {
        return this.rolesClient.send({cmd: "get_role_by_id"}, {id});

    };

    @ApiOperation({summary: 'Получить роль по её названию. Необходима роль Администратора.'})
    @ApiResponse({status: 200, type: Role})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post("/value")
    async getRoleByValue(@Body() value: string) {
        return this.rolesClient.send({cmd: "get_role_by_value"}, {value});
    };

    @ApiOperation({summary: 'Изменить роль по id. Необходима роль Администратора.'})
    @ApiResponse({status: 200})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Put(":id")
    async updateRole(@Param("id") id: string, @Body() dto: CreateRoleGTO) {
        return this.rolesClient.send({cmd: "update_role"}, {dto, id});
    };

    @ApiOperation({summary: 'Удалить роль по id. Необходима роль Администратора.'})
    @ApiResponse({status: 200})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Delete(":id")
    async deleteRole(@Param("id") id: string) {
        return this.rolesClient.send({cmd: "delete_role"}, {id});
    };
}