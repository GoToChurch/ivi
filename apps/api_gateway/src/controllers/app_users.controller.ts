import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {
    AddRoleDto,
    CurrentUserOrAdminGuard, JwtAuthGuard,
    RegistrationDto,
    Roles,
    RolesGuard,
    UpdateUserDto,
    User
} from '@app/common';


@ApiTags("Пользователи")
@Controller("/users")
export class AppUsersController {
    constructor(@Inject("USERS") private readonly userClient: ClientProxy) {}

    @ApiOperation({summary: `Создание пользователя. Первый зарегистрированный пользователь получает роль 
    супер пользователя(SUPERUSER), все последующие пользователи при регистрации получают роль пользователя(USER)`})
    @ApiResponse({status: 201, type: User})
    @Post()
    async createUser(@Body() registrationDto: RegistrationDto) {
        const role = "USER";

        return this.userClient.send({
            cmd: "user-registration"
        }, {
            registrationDto,
            role
        });
    };

    @ApiOperation({summary: "Получить всех пользователей. Необходима роль Администратора"})
    @ApiResponse({status: 200, type: [User]})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Get()
    async getAllUsers() {
        return this.userClient.send({
            cmd: "get-all-users"
        }, {

        });
    };

    @ApiOperation({summary: "Получить пользователя по id. Необходима роль Администратора или быть этим пользователем"})
    @ApiResponse({status: 200, type: User})
    @ApiParam({name: "id", example: 1})
    @UseGuards(CurrentUserOrAdminGuard)
    @Get("/:id")
    async getUserById(@Param("id") id: any) {
        return this.userClient.send({
            cmd: "get-user-by-id"
        }, {
            id
        });
    };

    @ApiOperation({summary: "Получить пользователя по email. Необходима роль Администратора или быть этим пользователем"})
    @ApiResponse({status: 200, type: User})
    @UseGuards(CurrentUserOrAdminGuard)
    @ApiParam({name: "email", example: "ivanov@gmail.com"})
    @Get("email/:email")
    async getUserByEmail(@Param("email") email: string) {
        return this.userClient.send({
            cmd: "get-user-by-email"
        }, {
            email
        });
    };

    @ApiOperation({summary: `Получить пользователя по номеру телефона(phone). Необходима роль Администратора 
    или быть этим пользователем`})
    @ApiResponse({status: 200, type: User})
    @ApiParam({name: "phone", example: "89960000000"})
    @UseGuards(CurrentUserOrAdminGuard)
    @Get("phone/:number")
    async getUserByPhone(@Param("number") number: string) {
        return this.userClient.send({
            cmd: "get-user-by-phone"
        }, {
            number
        });
    };

    @ApiOperation({summary: `Получить всех пользователей фильтруя их по возрасту(age) И стране(country). 
    Необходима роль Администратора. Примеры запроса: localhost:3000/api/users/29/Россия или 
    localhost:3000/api/users/Россия/29, очерёдность не имеет значения`})
    @ApiResponse({status: 200, type: [User]})
    @ApiParam({name: "value1", example: "Россия", description: "Первый фильтр"})
    @ApiParam({name: "value2", example: 29, description: "Второй фильтр"})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Get("filter/:value1/:value2")
    async UserCountryAndAgeFilters(@Param("value1") value1: string,
                                   @Param("value2") value2?: string,
                                   @Query() query?) {

        return this.userClient.send({
            cmd: "get-users-by-params"
        }, {
            value1,
            value2,
            query
        });
    };

    @ApiOperation({summary: `Получить всех пользователей фильтруя их по возрасту(age) ИЛИ по стране(country).
    Необходима роль Администратора`})
    @ApiResponse({status: 200, type: [User]})
    @ApiParam({name: "value", example: "Россия", description: "Фильтр"})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Get("filter/:value")
    async UserCountryOrAgeFilter(@Param("value") value: string,
                                 @Query() query?) {
        return this.userClient.send({
            cmd: "get-users-by-param"
        }, {
            value,
            query
        });
    };

    @ApiOperation({summary: `Получить всех пользователей фильтруя их по роли пользователя(Например, "USER"). 
    Необходима роль Администратора`})
    @ApiResponse({status: 200, type: [User]})
    @ApiParam({name: "role", example: "USER"})
    @Roles('ADMIN', 'SUPERUSER')
    @UseGuards(RolesGuard)
    @Get("role/:role")
    async getUsersByRole(@Param("role") role: string,) {
        return this.userClient.send({
            cmd: "get-users-by-role"
            }, {
            role
        });
    };

    @ApiOperation({summary: `Изменить пользователя по id. Необходима роль Администратора или быть этим пользователем`})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @UseGuards(CurrentUserOrAdminGuard)
    @Put("/:id")
    async updateUser(@Param("id") id: string,
                     @Body() updateUserDto: UpdateUserDto) {
        return this.userClient.send({
            cmd: "update-user"
        }, {
            updateUserDto,
            id
        });
    };

    @ApiOperation({summary: "Удалить пользователя по id. Необходима роль Администратора или быть этим пользователем"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @UseGuards(CurrentUserOrAdminGuard)
    @Delete("/:id")
    async deleteUser(@Param("id") id: string) {
        return this.userClient.send({
            cmd: "delete-user"
        }, {
            id
        });
    };

    @ApiOperation({summary: `Добавить роль пользователя по id пользователя и значению роли(value). 
    Необходима роль Администратора`})
    @ApiResponse({status: 201, type: User})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("role/add")
    async addRoleToUser(@Body() addRoleDto: AddRoleDto) {
        return this.userClient.send({
            cmd: "add-role-to-user"
        }, {
            addRoleDto
        });
    };


    @ApiOperation({summary: `Удалить роль пользователя по id пользователя и значению роли(value). 
    Необходима роль Администратора`})
    @ApiResponse({status: 201, type: User})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("role/delete")
    async deleteRoleFromUser(@Body() addRoleDto: AddRoleDto) {
        return this.userClient.send({
            cmd: "delete-role-from-user"
        }, {
            addRoleDto
        });
    };

    @ApiOperation({summary: `Получить все комментарии пользователя по id. 
    Необходима быть зарегестрированным пользователем`})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuard)
    @Get("/:id/reviews")
    async getAllUsersReviews(@Param("id") id: string) {
        return this.userClient.send({
            cmd: "get-all-users-reviews"
        }, {
            id
        });
    };
}