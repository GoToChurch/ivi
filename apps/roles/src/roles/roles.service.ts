import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "@lib/global";
import {CreateRoleGTO} from "../ROLES_DTO/role_create_dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private readonly roleRepository: typeof Role) {
  }
  async create_role(dto: CreateRoleGTO) {
    const new_role = await this.roleRepository.create(dto);
    return new_role;
  }

  async getAllRoles() {
    const roles = await this.roleRepository.findAll({include: {all: true}});
    return roles;
  }

  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({where: {value: value}});
    return role;
  }

  async getRoleById(id: string) {
    const role = await this.roleRepository.findByPk(+id);
    return role;
  }

  async updateRole(dto: CreateRoleGTO, role_id: string) {
    const role = await this.roleRepository.update({...dto}, {where: {id: +role_id}});
    return role;
  }

  async deleteRole(role_id: string) {
    const role = await this.roleRepository.destroy({where: {id: +role_id}});
    return role;
  }
}
