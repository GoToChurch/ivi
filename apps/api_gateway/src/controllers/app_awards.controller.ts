import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Award, CreateAwardDto, CreateNominationDto, Nomination, Roles, RolesGuard, UpdateAwardDto} from "@app/common";


@ApiTags("Награды")
@Controller()
export class AppAwardsController {
    constructor(@Inject("AWARD") private readonly awardClient: ClientProxy) {}

    @ApiOperation({summary: "Создание новой награды"})
    @ApiResponse({status: 201, type: Award})
    @ApiBody({ type: CreateAwardDto })
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/awards")
    async createAward(@Body() createAwardDto: CreateAwardDto) {
        return this.awardClient.send(
            {
                cmd: "create-award",
            }, {
                createAwardDto
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех наград"})
    @ApiResponse({status: 200, type: [Award]})
    @Get("/awards")
    async getAllAwards() {
        return this.awardClient.send(
            {
                cmd: "get-all-awards",
            }, {

            },
        );
    }

    @ApiParam({name: "id", example: 1})
    @ApiOperation({summary: "Получение награды по id"})
    @ApiResponse({status: 200, type: Award})
    @Get("/awards/:id")
    async getAward(@Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "get-award"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование награды по id"})
    @ApiResponse({status: 201, type: Award})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Put("/awards/:id")
    async editAward(@Body() updateAwardDto: UpdateAwardDto,
                    @Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "edit-award"
            }, {
                updateAwardDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Удаление награды по id"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Delete("/awards/:id")
    async deleteAward(@Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "delete-award"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Создание новой номинации"})
    @ApiResponse({status: 201, type: Nomination})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Post("/nominations")
    async createNomination(@Body() createNominationDto: CreateNominationDto) {
        return this.awardClient.send(
            {
                cmd: "create-nomination",
            }, {
                createNominationDto
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех номинаций"})
    @ApiResponse({status: 200, type: [Nomination]})
    @Get("/nominations")
    async getAllNominations() {
        return this.awardClient.send(
            {
                cmd: "get-all-nominations",
            }, {

            },
        );
    }

    @ApiOperation({summary: "Получение номинации по id"})
    @ApiResponse({status: 200, type: Nomination})
    @ApiParam({name: "id", example: 1})
    @Get("/nominations/:id")
    async getNomination(@Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "get-nomination"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование номинации по id"})
    @ApiResponse({status: 201, type: Nomination})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Put("/nominations/:id")
    async editNomination(@Body() createNominationDto: CreateNominationDto,
                         @Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "edit-nomination"
            }, {
                createNominationDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Удаление номинации по id"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @Roles("ADMIN", "SUPERUSER")
    @UseGuards(RolesGuard)
    @Delete("/nominations/:id")
    async deleteNomination(@Param("id") id: any) {
        return this.awardClient.send(
            {
                cmd: "delete-nomination"
            }, {
                id
            }
        )
    }
}
