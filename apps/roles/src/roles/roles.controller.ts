import { Controller, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import {Ctx, EventPattern, MessagePattern, Payload, RmqContext} from "@nestjs/microservices";
import {CreateRoleGTO} from "../ROLES_DTO/role_create_dto";

@Controller('/api/v1/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern({cmd: "role_registration"})
  async create_role(@Ctx() context: RmqContext, @Payload() payload) {
    return await this.rolesService.create_role(payload.dto);
  }

  @MessagePattern({cmd: "get_all_roles"})
  async getAllRoles() {
    const roles = await this.rolesService.getAllRoles();
    return roles;
  }

  @MessagePattern({cmd: "get_role_by_value"})
  async getRoleByValue(@Ctx() context: RmqContext, @Payload() payload) {
    console.log(payload)
    const value = payload['role_value']
    const role = await this.rolesService.getRoleByValue(value);
    if(role) {
      return role;
    }
    return {message: `Роли ${value} не существует`}
  }

  @MessagePattern({cmd: "get_role_by_id"})
  async getRoleById(@Ctx() context: RmqContext, @Payload() payload) {
    const role = await this.rolesService.getRoleById(payload.id);
    return role;
  }

  @MessagePattern({cmd: "update_role"})
  async update_role(@Ctx() context: RmqContext, @Payload() payload) {
    const role = await this.rolesService.updateRole(payload.dto, payload.id);
    return role;
  }

  @MessagePattern({cmd: "delete_role"})
  async delete_role(@Ctx() context: RmqContext, @Payload() payload) {
    const role = await this.rolesService.deleteRole(payload.id);
    return role;
  }
}
