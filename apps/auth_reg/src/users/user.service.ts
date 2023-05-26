import {HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import * as bcrypt from "bcryptjs";
import {JwtService} from "@nestjs/jwt";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {AddRoleDto, RegistrationDto, Review, UpdateUserDto, User, UserRoles} from "@app/common";


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userRepository: typeof User,
                @InjectModel(UserRoles) private readonly userRolesRepository: typeof UserRoles,
                @Inject("ROLES") private readonly roleClient: ClientProxy,
                private readonly jwtService: JwtService) {}

    async userRegistration(registrationDto: RegistrationDto, role: string) {
        console.log(registrationDto)
        const existing_user = await this.getUserByEmail(registrationDto.email)
        const users: User[] = await this.getAllUsers();

        if (users.length === 0) {
            role = "SUPERUSER";
            const hashPassword = await bcrypt.hash(registrationDto.password, 5);
            const user = await this.userRepository.create({...registrationDto, password: hashPassword});
            await user.$set("roles", []);

            await this.addRoleToUser({userId: user.id, value: role});

            return user;
        }
        if (!existing_user) {
            const hashPassword = await bcrypt.hash(registrationDto.password, 5);
            const user = await this.userRepository.create({...registrationDto, password: hashPassword});
            await user.$set("roles", []);
            if (registrationDto.role == "ADMIN") {
                role = "ADMIN"
            }
            await this.addRoleToUser({userId: user.id, value: role});
            return user;
        }
        throw new HttpException("Такой пользователь уже существует", HttpStatus.BAD_REQUEST)
    };

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async getUserById(id: number) {
        return await this.userRepository.findByPk(id, {
            include: {
                all: true
            }
        });
    };

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: {
                email: email
            },
            include: {
                all: true
            }
        });
    };

    async getUserByPhone(phone: string) {
        return await this.userRepository.findOne({
            where: {
                phone: phone
            }, include: {
                all: true
            }
        });
    };

    async getUsersByRole(value: string) {
        const users = await this.userRepository.findAll();
        const role = await lastValueFrom(this.roleClient.send({
            cmd: "get-role-by-value"
        }, {
            value
        }));
        const usersIds = await this.userRolesRepository.findAll({
            where: {
                roleId: role.id
            }
        })

        let userIdsArray = [];

        for (const usersId of usersIds) {
            userIdsArray.push(usersId.userId)
        }

        return users.filter(user => userIdsArray.includes(user.id));
    };

    async UserCountryAndAgeFilters(param1: string, param2: string) {
        const users: User[] = await this.getAllUsers()
        const first_param = await this.identifyRequestString(param1, users);

        return await this.identifyRequestString(param2, first_param);
    };

    async UserCountryOrAgeFilter(param1: string) {
        const users: User[] = await this.getAllUsers();

        return await this.identifyRequestString(param1, users);
    };

    private async identifyRequestString(reqString: string, users, query ?) {
        if (reqString.length < 3 && reqString.match(/\d+/g)) {
            return users.filter(user => user.age === +reqString)
        } else {
            return users.filter(user => user.country === reqString)
        }
    };

    async updateUser(updateUserDto: UpdateUserDto, id, hash=true) {
        if (updateUserDto.password) {
            if (hash) {
                const hashPassword = await bcrypt.hash(updateUserDto.password, 5);
                return await this.userRepository.update({...updateUserDto, password: hashPassword}, {
                    where: {
                        id: +id
                    }
                });
            } else {
                return await this.userRepository.update({...updateUserDto}, {
                    where: {
                        id: +id
                    }
                });
            }

        }

        return await this.userRepository.update({...updateUserDto}, {
            where: {
                id: +id
            }
        });
    };

    async deleteUser(id: number) {
        return await this.userRepository.destroy({
            where: {
                id
            }
        });
    };

    async addRoleToUser(addRoleDto: AddRoleDto) {
        const user = await this.userRepository.findByPk(addRoleDto.userId);

        if (addRoleDto.value === 'SUPERUSER') {
            const createRoleDto = {
                value: 'SUPERUSER',
                description: 'Суперпользователь'
            }

            const role = await lastValueFrom(this.roleClient.send({
                cmd: "create-role"
            }, {
                createRoleDto
            }))
        }

        const role = await lastValueFrom(this.roleClient.send({
            cmd: "get-role-by-value"
        }, {
            value: addRoleDto.value
        }))

        if (role && user) {
            await user.$add("role", role.id);
            return user;
        }

        throw new HttpException("Пользователь или роль не найдены", HttpStatus.NOT_FOUND);
    };

    async deleteRoleFromUser(addRoleDto: AddRoleDto) {
        const role = await lastValueFrom(this.roleClient.send({
            cmd: "get-role-by-value"
        }, {
            value: addRoleDto.value
        }))

        return await this.userRolesRepository.destroy({
            where: {
                roleId: role.id,
                userId: addRoleDto.userId
            }
        })
    };

    async inspectUserToken(token: string) {
        return await this.jwtService.verify(token);
    };

    async addReviewToUser(review: Review, id: number) {
        const user = await this.getUserById(id);
        user.reviews.push(review);
        const reviewsArray = user.reviews;

        return await this.updateUser({...user.dataValues, reviews: reviewsArray}, user.id, false);
    }

    async deleteReviewFromUser(reviewId: number, id: number) {
        const user = await this.getUserById(id);
        const reviewsArray = (await this.getAllUsersReviews(id)).filter(review => review.id != reviewId);

        return await this.updateUser({...user.dataValues, reviews: reviewsArray}, user.id, false);
    }

    async getAllUsersReviews(id: number) {
        const user = await this.getUserById(id);
        return user.reviews.map(review => JSON.parse(String(review)));
    }
}


