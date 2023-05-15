import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RegistrationDto} from "@app/common";
import {User} from "@app/common";
import {UserUpdateDto} from "@app/common";
import * as bcrypt from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {CreateReviewDto} from "@app/common";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User,
                private readonly jwtService: JwtService) {
    }

    async userRegistration(dto: RegistrationDto, role: [string]) {
        const existing_user = await this.getUserByEmail(dto.email)
        const users: User[] = await this.userRepository.findAll({include: {all: true}});
        if (users.length === 0) {
            role = ["SUPERUSER"];
            const hash_password = await bcrypt.hash(dto.password, 5);
            const user = await this.userRepository.create({...dto, password: hash_password, roles: role});
            return user
        }
        if (!existing_user) {
            const hash_password = await bcrypt.hash(dto.password, 5);
            const user = await this.userRepository.create({...dto, password: hash_password, roles: role});
            return user;
        }
        throw new HttpException('Такой пользователь уже существует', HttpStatus.BAD_REQUEST)
    };

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}})
        return users
    }


    //const users = await this.userRepository.findAll({include: {all: true}});
    //return users;


    async getUserById(user_id: string) {
        const user = await this.userRepository.findByPk(+user_id, {include: {all: true}});
        return user;
    };


    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email: email}, include: {all: true}});
        return user;
    };


    async getUserByPhone(phone: string) {
        const user = await this.userRepository.findOne({where: {phone: phone}, include: {all: true}});
        return user;
    };


    async getUsersByRole(role: string) {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users.filter(user => user.roles.includes(role));
    };


    async userCountryAndAgeFilters(param1: string, param2: string) {
        const users: User[] = await this.getAllUsers()
        //const users: User[] = await this.userRepository.findAll({include: {all: true}});
        const first_param = await this.identifyRequestString(param1, users);
        const second_param = await this.identifyRequestString(param2, first_param);
        return second_param;
    };


    async userCountryOrAgeFilter(param1: string) {
        const users: User[] = await this.getAllUsers()
        //const users: User[] = await this.userRepository.findAll();
        return await this.identifyRequestString(param1, users);
    };


    private async identifyRequestString(reqString: string, users, query ?) {
        if (reqString.length < 3 && reqString.match(/\d+/g)) {
            return users.filter(user => user.age === +reqString)
        } else {
            return users.filter(user => user.country === reqString)
        }
    };


    async updateUser(dto: UserUpdateDto, id) {
        if (dto.password) {
            const hash_password = await bcrypt.hash(dto.password, 5);
            const user = await this.userRepository.update({...dto, password: hash_password}, {where: {id: +id}});
            return user;
        }
        const user = await this.userRepository.update({...dto}, {where: {id: +id}});
        return user;
    };


    async deleteUser(id: string) {
        const user = await this.userRepository.destroy({where: {id: +id}});
        return user;
    };


    async addRoleToUser(user_id: string, role ?: string) {
        const user = await this.getUserById(user_id);
        if (role && !user.roles.includes(role)) {
            user.roles.push(role)
            const updated_user = await this.userRepository.update({...user, roles: user.roles},
                {where: {id: +user.id}});
            return updated_user;
        } else {
            return user
        }
    };


    async deleteRoleFromUser(user_id: string, role: string) {
        const user = await this.getUserById(user_id);
        if (role && user.roles.includes(role)) {
            const role_index = user.roles.findIndex(item => item === role)
            if (role_index !== (+user.roles.length - 1)) {
                [user.roles[role_index], user.roles[+user.roles.length - 1]] =
                    [user.roles[+user.roles.length - 1], user.roles[role_index]];
                user.roles.splice(role_index, role_index);
                user.roles.pop();
                await this.userRepository.update({...user, roles: user.roles}, {where: {id: +user.id}});
                return user;
            } else {
                user.roles.pop();
                return user
            }
        } else {
            return user;
        }
    };


    async InspectUserToken(token: string) {
        return await this.jwtService.verify(token);
    };


    async createIdToUserReview(review: CreateReviewDto, user_id: string, film_id: string, parent_id ?: string) {
        const id = await uuidv4()
        if (parent_id) {
            return {
                id: id,
                title: review.title,
                text: review.text,
                user_id: +user_id,
                film_id: +film_id,
                parent_id: parent_id
            }
        }
        return {
            id: id,
            title: review.title,
            text: review.text,
            user_id: +user_id,
            film_id: +film_id
        }
    }
    ;


    async addReviewToUser(user_id: string, review: string) {
        const user = await this.getUserById(user_id);
        const new_user = user.dataValues
        console.log(new_user)
        if (review) {
            new_user.reviews.push(review)
            const updated_user = await this.userRepository.update({...new_user, reviews: new_user.reviews},
                {where: {id: +new_user.id}});
            return updated_user;
        } else {
            return new_user
        }
    };


    async deleteReviewFromUser(user_id: string, review: string) {
        const user = await this.getUserById(user_id);
        if (review && user.dataValues.reviews.includes(review)) {
            console.log('Уже здесь')
            const review_index = user.dataValues.reviews.findIndex(item => item === review)
            console.log(review_index)
            if (review_index !== (+user.dataValues.reviews.length - 1)) {
                [user.dataValues.reviews[review_index], user.dataValues.reviews[+user.dataValues.reviews.length - 1]] =
                    [user.dataValues.reviews[+user.dataValues.reviews.length - 1], user.dataValues.reviews[review_index]];
                user.dataValues.reviews.splice(review_index, review_index);
                user.dataValues.reviews.pop();
                await this.userRepository.update({...user.dataValues, reviews: user.dataValues.reviews},
                    {where: {id: +user.dataValues.id}});
                return user;
            } else {
                console.log('Хрю-хрю')
                user.dataValues.reviews.pop();
                await this.userRepository.update({...user.dataValues, reviews: user.dataValues.reviews},
                    {where: {id: +user.dataValues.id}});
                return user.dataValues
            }
        } else {
            return user.dataValues;
        }
    }
}


