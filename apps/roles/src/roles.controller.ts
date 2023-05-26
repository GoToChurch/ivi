import {Controller} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {Ctx, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";


@Controller("/api/v1/roles")
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({cmd: "create-role"})
  async createRole(@Ctx() context: RmqContext,
                   @Payload() payload) {
    return await this.rolesService.createRole(payload.createRoleDto);
  }

  @MessagePattern({cmd: "get-all-roles"})
  async getAllRoles() {
    return await this.rolesService.getAllRoles();
  }

  @MessagePattern({cmd: "get-role-by-value"})
  async getRoleByValue(@Ctx() context: RmqContext,
                       @Payload() payload) {
    return await this.rolesService.getRoleByValue(payload.value)
  }

  @MessagePattern({cmd: "get-role-by-id"})
  async getRoleById(@Ctx() context: RmqContext,
                    @Payload() payload) {
    return await this.rolesService.getRoleById(payload.id);
  }

  @MessagePattern({cmd: "update-role"})
  async updateRole(@Ctx() context: RmqContext,
                   @Payload() payload) {
    return await this.rolesService.updateRole(payload.updateRoleDto, payload.id);
  }

  @MessagePattern({cmd: "delete-role"})
  async deleteRole(@Ctx() context: RmqContext,
                   @Payload() payload) {
    return await this.rolesService.deleteRole(payload.id);
  }
}
