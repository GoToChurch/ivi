import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {RegistrationDto} from "@app/common";
import {UserUpdateDto} from "@app/common";
import {AddRoleToUserDTO} from "@app/common";
import {Current_user_or_admin_guard} from "@app/common";
import {Roles} from "@app/common";
import {User} from "@app/common";
import {RolesGuard} from "@app/common";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateReviewDto, Review} from "@app/common";
import {Jwt_auth_guard} from "@app/common";
import {GoogleAuthenticatedGuard} from "@app/common";

@ApiTags('Пользователи')
@Controller("/users")
export class AppUsersController {
    constructor(@Inject("USERS") private readonly usersClient: ClientProxy,
                @Inject('FILM') private readonly filmService: ClientProxy
    ) {
    }

    @ApiOperation({summary: 'Создание пользователя. Первый зарегистрированный пользователь получает' +
            ' роль супер пользователя(SUPERUSER), все последующие пользователи при регистрации получают' +
            ' роль пользователя(USER)'})
    @ApiResponse({status: 201, type: User})
    @Post()
    async createUser(@Body() dto: RegistrationDto) {
        const role = ['USER']
        return this.usersClient.send({cmd: "user-registration"}, {dto, role});
    };

    @ApiOperation({summary: 'Получить всех пользователей. Необходима роль Администратора'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get()
    async getAllUsers() {
        return this.usersClient.send({cmd: "get-all-users"}, {});
    };

    @ApiOperation({
        summary: 'Получить пользователя по id. Необходима роль Администратора' +
            ' или быть этим пользователем.'
    })
    @ApiResponse({status: 200, type: User})
    @ApiParam({name: "id", example: 1})
    @UseGuards(Current_user_or_admin_guard)
    @Get(":id")
    async getUserById(@Param("id") id: string) {
        return this.usersClient.send({cmd: "get-user-by-id"}, {id});

    };

    @ApiOperation({
        summary: 'Получить пользователя по email. Необходима роль Администратора' +
            ' или быть этим пользователем.'
    })
    @ApiResponse({status: 200, type: User})
    @UseGuards(Current_user_or_admin_guard)
    @ApiParam({name: "email", example: "ivanov@gmail.com"})
    @Get("email/:email")
    async getUserByEmail(@Param("email") email: string) {
        return this.usersClient.send({cmd: "get-user-by-email"}, {email});
    };

    @ApiOperation({
        summary: 'Получить пользователя по номеру телефона(phone). Необходима роль Администратора' +
            ' или быть этим пользователем.'
    })
    @ApiResponse({status: 200, type: User})
    @ApiParam({name: "phone", example: "89960000000"})
    @UseGuards(Current_user_or_admin_guard)
    @Get("phone/:number")
    async getUserByPhone(@Param("number") number: string) {
        return this.usersClient.send({cmd: "get-user-by-phone"}, {number});
    };

    @ApiOperation({
        summary: 'Получить всех пользователей фильтруя их по возрасту(age) И стране(country).' +
            ' Необходима роль Администратора. Примеры запроса: localhost:3000/api/users/29/Россия или' +
            ' localhost:3000/api/users/Россия/29, очерёдность не имеет значения'
    })
    @ApiResponse({status: 200, type: [User]})
    @ApiParam({name: "value1", example: "Россия", description: "Первый фильтр"})
    @ApiParam({name: "value2", example: '29', description: "Второй фильтр"})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get("filter/:value1/:value2")
    async UserCountryAndAgeFilters(@Param("value1") value1: string,
                                   @Param("value2") value2: string) {

        return this.usersClient.send({cmd: "get-users-by-params"}, {value1, value2});
    };

    @ApiOperation({
        summary: 'Получить всех пользователей фильтруя их по возрасту(age) ИЛИ по стране(country).' +
            ' Необходима роль Администратора'
    })
    @ApiResponse({status: 200, type: [User]})
    @ApiParam({name: "value", example: "Россия", description: "Фильтр"})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get("filter/:value")
    async UserCountryOrAgeFilter(@Param("value") value: string) {
        return this.usersClient.send({cmd: "get-users-by-param"}, {value});
    };

    @ApiOperation({
        summary: 'Получить всех пользователей фильтруя их по роли пользователя(Например, "USER").' +
            ' Необходима роль Администратора'
    })
    @ApiResponse({status: 200, type: [User]})
    @ApiParam({name: "role", example: "USER"})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get("role/:role")
    async getUsersByRole(@Param("role") role: string,) {
        return this.usersClient.send({cmd: "get-users-by-role"}, {role});
    };

    @ApiOperation({
        summary: 'Изменить пользователя по id. Необходима роль Администратора' +
            ' или быть этим пользователем.'
    })
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @UseGuards(Current_user_or_admin_guard)
    @Put(":id")
    async updateUser(@Param("id") id: string, @Body() dto: UserUpdateDto) {
        return this.usersClient.send({cmd: "update-user"}, {dto, id});
    };


    @ApiOperation({
        summary: 'Удалить пользователя по id. Необходима роль Администратора' +
            ' или быть этим пользователем.'
    })
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @UseGuards(Current_user_or_admin_guard)
    @Delete(":id")
    async deleteUser(@Param("id") id: string) {
        return this.usersClient.send({cmd: "delete-user"}, {id});
    };


    @ApiOperation({
        summary: 'Добавить роль пользователя по id пользователя и значению роли(value).' +
            ' Необходима роль Администратора.'
    })
    @ApiResponse({status: 201, type: User})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post("role/add")
    async addRoleToUser(@Body() dto: AddRoleToUserDTO) {
        try {
            return this.usersClient.send({cmd: "add-role-to-user"}, {dto});
        } catch (err) {
            return {message: `Такой роли нет или она уже есть у данного пользователя`}
        }
    };

    @ApiOperation({
        summary: 'Удалить роль пользователя по id пользователя и значению роли(value).' +
            ' Необходима роль Администратора.'
    })
    @ApiResponse({status: 201, type: User})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Post("role/delete")
    async deleteRoleFromUser(@Body() dto: AddRoleToUserDTO) {
        try {
            return this.usersClient.send({cmd: "delete-role-from-user"}, {dto});
        } catch (err) {
            return {message: `Такой роли нет или её нет у данного пользователя`}
        }
    };

    @ApiOperation({
        summary: 'Добавить ответ на комментарий к фильму по id фильма и id родительского комментария.' +
            ' Необходимо быть авторизованным пользователем. Первым в строку запроса передаётся id фильма,' +
            ' а вторым id родительского комментария.'
    })
    @ApiParam({name: "film_id", example: 1, description: "id фильма"})
    @ApiParam({name: "parent_id", example: '29', description: "id комментария, на который отвечают"})
    @ApiResponse({status: 201, type: User})
    @UseGuards(Jwt_auth_guard)
    @Post("reviews/add/:film_id/:parent_id")
    async addReviewWithParentToUser(@Body() dto: CreateReviewDto,
                                    @Req() req: Request,
                                    @Param("film_id") film_id: string,
                                    @Param("parent_id") parent_id: string) {
        const token = req.headers["authorization"].split(' ')[1]
        try {
            return this.usersClient.send({cmd: "add-review-to-user"}, {dto, token, film_id, parent_id});

        } catch (err) {
            return {message: `Такой обзор уже есть у данного пользователя`}
        }
    };

    @ApiOperation({
        summary: 'Добавить комментарий пользователя к фильму по id фильма.' +
            ' Необходимо быть авторизованным пользователем.'
    })
    @ApiResponse({status: 201, type: User})
    @ApiParam({name: "film_id", example: 1, description: "id фильма"})
    @UseGuards(Jwt_auth_guard)
    @Post("reviews/add/:film_id")
    async addReviewToUser(@Body() dto: CreateReviewDto,
                          @Req() req: Request,
                          @Param("film_id") film_id: string) {
        const token = req.headers["authorization"].split(' ')[1]
        try {
            return this.usersClient.send({cmd: "add-review-to-user"}, {dto, token, film_id});
        } catch (err) {
            return {message: `Такой обзор уже есть у данного пользователя`}
        }
    };

    @ApiOperation({
        summary: 'Удалить комментарий пользователя к фильму по id пользователя и id комментария. Первым в строку' +
            ' запроса передаётся id пользователя, а вторым id комментария.' +
            ' Необходима роль Администратора или быть этим пользователем.'
    })
    @ApiResponse({status: 201, type: User})
    @ApiParam({name: "id", example: 1, description: "id пользователя"})
    @ApiParam({name: "review_id", example: "jeri-312klk-kfkf-646kk-7rhj34", description: "id комментария"})
    @UseGuards(Current_user_or_admin_guard)
    @Delete("reviews/delete/:id/:review_id")
    async deleteReviewFromUser(@Param('id') id: string, @Param('review_id') review_id: string) {
        try {
            return this.usersClient.send({cmd: "delete-review-from-user"}, {id, review_id});
        } catch (err) {
            return {message: `Такого обзора нет у данного пользователя`}
        }
    }

    @ApiOperation({summary: "Получение списка всех комментариев"})
    @ApiResponse({status: 200, type: [CreateReviewDto]})
    @Get('/reviews')
    async getAllReviews() {
        return this.filmService.send(
            {
                cmd: 'get-all-reviews',
            },
            {},
        );
    }

    @ApiOperation({summary: "Получение списка комментария по id"})
    @ApiResponse({status: 200, type: Review})
    @ApiParam({name: "id", example: 1})
    @UseGuards(Jwt_auth_guard || GoogleAuthenticatedGuard)
    @Get('/reviews/:id')
    async getReview(@Param('id') id: any) {
        return this.filmService.send(
            {
                cmd: 'get-review'
            },
            {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование комментария с указанным id"})
    @ApiResponse({status: 201, type: Review})
    @ApiParam({name: "id", example: 1})
    @UseGuards(Current_user_or_admin_guard)
    @Put('/reviews/:id')
    async editReview(@Body() createReviewDto: CreateReviewDto,
                     @Param('id') id: any) {
        return this.filmService.send(
            {
                cmd: 'edit-review'
            },
            {
                createReviewDto,
                id
            }
        )
    }
}