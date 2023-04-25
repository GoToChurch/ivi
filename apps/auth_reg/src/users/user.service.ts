import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RegistrationDto} from "./USER_DTO/registrationDto";
import {User} from "@lib/global";
import {UserUpdateDto} from "./USER_DTO/userUpdateDto";
import * as bcrypt from "bcryptjs";


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User) {
    }

    async user_registration(dto: RegistrationDto, role: [string]) {
        console.log(dto)
        const hash_password = await bcrypt.hash(dto.password, 5);
        const user = await this.userRepository.create({...dto, password: hash_password, roles: role});
        return user;

    };

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    };

    async getUserById(user_id: string) {
        const user = await this.userRepository.findByPk(+user_id, {include: {all: true}});
        return user;
    };

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email: email}, include: {all: true}});
        return user;
    };

    async updateUser(dto: UserUpdateDto, id) {
        const hash_password = await bcrypt.hash(dto.password, 5);
        const user = await this.userRepository.update({...dto, password: hash_password}, {where: {id: +id}});
        return user;
    };

    async deleteUser(id: string) {
        const user = await this.userRepository.destroy({where: {id: +id}});
        return user;
    };

    async addRoleToUser(user_id: string, role?: string) {
        const user = await this.getUserById(user_id);
        if (role && !user.roles.includes(role)) {
            user.roles.push(role)
            const updated_user = await this.userRepository.update({...user, roles: user.roles},
                {where: {id: +user.id}});
            return updated_user;
        } else {
            return user
        }
    }
    async deleteRoleFromUser(user_id: string, role: string) {
        const user = await this.getUserById(user_id);
        if (role && user.roles.includes(role)) {
            const role_index = user.roles.findIndex(item => item === role)
            console.log(role_index)
            if(role_index !== (+user.roles.length - 1)) {
                [user.roles[role_index], user.roles[+user.roles.length - 1]] =
                    [user.roles[+user.roles.length - 1], user.roles[role_index]];
                user.roles.splice(role_index, role_index);
                user.roles.pop();
                console.log(user.roles);
                await this.userRepository.update({...user, roles:user.roles}, {where: {id: +user.id}});
                return user;
            }else {
                user.roles.pop();
                console.log(user.roles);
                return user
            }
        }else {
            return user;
        }
    }
}


