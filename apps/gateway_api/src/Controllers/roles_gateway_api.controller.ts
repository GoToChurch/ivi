import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";;
import {CreateRoleGTO} from "../../../roles/src/ROLES_DTO/role_create_dto";
import {Roles, RolesGuard} from "@lib/global";


@Controller("/roles")
export class RolesGatewayApiController {
  constructor(@Inject("ROLES") private readonly rolesClient: ClientProxy) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post()
  async createRoles(@Body() dto: CreateRoleGTO) {
    return this.rolesClient.send({cmd: "role_registration"}, {dto});
  };

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get()
  async getAllRoles() {
      return this.rolesClient.send({cmd: "get_all_roles"}, {});
  };

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Get(":id")
  async getRoleById(@Param("id") id: string) {
    return this.rolesClient.send({cmd: "get_role_by_id"}, {id});

  };

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post("/value")
  async getRoleByValue(@Body() value: string) {
    return this.rolesClient.send({cmd: "get_role_by_value"}, {value});
  };

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Put(":id")
  async updateRole(@Param("id") id: string, @Body() dto: CreateRoleGTO) {
    return this.rolesClient.send({cmd: "update_role"}, {dto, id});
  };

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Delete(":id")
  async deleteRole(@Param("id") id: string) {
    return this.rolesClient.send({cmd: "delete_role"}, {id});
  };
}
