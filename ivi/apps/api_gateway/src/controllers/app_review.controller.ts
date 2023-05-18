import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateReviewDto, CurrentUserOrAdminGuard, GoogleAuthenticatedGuard, JwtAuthGuard, Review} from "@app/common";


@ApiTags("Комментарии")
@Controller()
export class AppReviewController {
    constructor(@Inject("REVIEW") private readonly reviewClient: ClientProxy) {}

    @ApiOperation({summary: "Добавление комментария к фильму с указанным filmId"})
    @ApiResponse({status: 201, type: Review})
    @ApiParam({name: "filmId", example: 1, description: "id фильма"})
    @UseGuards(JwtAuthGuard || GoogleAuthenticatedGuard)
    @Post("/films/:filmId")
    async addReview(@Body() createReviewDto: CreateReviewDto,
                    @Req() request,
                    @Param("filmId") filmId: any) {
        const user = request.user;
        const userId = user.id;

        return this.reviewClient.send(
            {
                cmd: "create-review",
            }, {
                createReviewDto,
                filmId,
                userId
            },
        );
    }
    @ApiOperation({summary: "Добавление комментария к комментарию с указанным parentId к фильму с указанным filmId"})
    @ApiResponse({status: 201, type: Review})
    @ApiParam({name: "filmId", example: 1, description: "id фильма"})
    @ApiParam({name: "parentId", example: 1, description: "id родительского комментария"})
    @UseGuards(JwtAuthGuard || GoogleAuthenticatedGuard)
    @Post("/films/:filmId/review/:parentId")
    async addChildReview(@Body() createReviewDto: CreateReviewDto,
                         @Req() request,
                         @Param("filmId") filmId: any,
                         @Param("parentId") parentId: any) {
        const user = request.user;
        const userId = user.id;

        return this.reviewClient.send(
            {
                cmd: "create-review",
            }, {
                createReviewDto,
                filmId,
                userId,
                parentId
            },
        );
    }

    @ApiOperation({summary: "Получение списка всех комментариев"})
    @ApiResponse({status: 200, type: [Review]})
    @Get("/reviews")
    async getAllReviews() {
        return this.reviewClient.send(
            {
                cmd: "get-all-reviews",
            }, {

            },
        );
    }

    @ApiOperation({summary: "Получение списка комментария по id"})
    @ApiResponse({status: 200, type: Review})
    @ApiParam({name: "id", example: 1})
    @Get("/reviews/:id")
    async getReview(@Param("id") id: any) {
        return this.reviewClient.send(
            {
                cmd: "get-review"
            }, {
                id
            }
        )
    }

    @ApiOperation({summary: "Редактирование комментария с указанным id"})
    @ApiResponse({status: 201, type: Review})
    @ApiParam({name: "id", example: 1})
    @UseGuards(CurrentUserOrAdminGuard)
    @Put("/reviews/:id")
    async editReview(@Body() createReviewDto: CreateReviewDto,
                     @Param("id") id: any) {
        return this.reviewClient.send(
            {
                cmd: "edit-review"
            }, {
                createReviewDto,
                id
            }
        )
    }

    @ApiOperation({summary: "Удаление комментария с указанным id"})
    @ApiResponse({status: 201})
    @ApiParam({name: "id", example: 1})
    @UseGuards(CurrentUserOrAdminGuard)
    @Delete("/reviews/:id")
    async deleteReview(@Param("id") id: any,
                       @Req() request) {
        return this.reviewClient.send(
            {
                cmd: "delete-review"
            }, {
                id,
                userId: request.user.id
            }
        )
    }
}
