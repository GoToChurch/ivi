import {Body, Controller, Delete, Get, Inject, Param, Post, Put, Req} from '@nestjs/common';
import {ClientProxy} from "@nestjs/microservices";
import {AppService} from "../app.service";
import {CreateAwardDto, CreateNominationDto} from "@app/common";


@Controller()
export class AppAwardsController {
    constructor(@Inject('AWARD') private readonly awardService: ClientProxy,
                private appService: AppService) {}

    @Post('/awards')
    async createAward(@Body() createAwardDto: CreateAwardDto) {
        return this.awardService.send(
            {
                cmd: 'create-award',
            },
            {
                createAwardDto
            },
        );
    }

    @Get('/awards')
    async getAllAwards() {
        return this.awardService.send(
            {
                cmd: 'get-all-awards',
            },
            {},
        );
    }

    @Get('/awards/:id')
    async getAward(@Param('id') id: any) {
        return this.awardService.send(
            {
                cmd: 'get-award'
            },
            {
                id
            }
        )
    }

    @Put('/awards/:id')
    async editAward(@Body() createAwardDto: CreateAwardDto,
                    @Param('id') id: any) {
        return this.awardService.send(
            {
                cmd: 'edit-award'
            },
            {
                createAwardDto,
                id
            }
        )
    }

    @Delete('/awards/:id')
    async deleteAward(@Param('id') id: any) {
        return this.awardService.send(
            {
                cmd: 'delete-award'
            },
            {
                id
            }
        )
    }

    @Post('/nominations')
    async createNomination(@Body() createNominationDto: CreateNominationDto) {
        return this.awardService.send(
            {
                cmd: 'create-nomination',
            },
            {
                createNominationDto
            },
        );
    }

    @Get('/nominations')
    async getAllNominations() {
        return this.awardService.send(
            {
                cmd: 'get-all-nominations',
            },
            {},
        );
    }

    @Get('/nominations/:id')
    async getNomination(@Param('id') id: any) {
        return this.awardService.send(
            {
                cmd: 'get-nomination'
            },
            {
                id
            }
        )
    }

    @Put('/nominations/:id')
    async editNomination(@Body() createNominationDto: CreateNominationDto,
                         @Param('id') id: any) {
        return this.awardService.send(
            {
                cmd: 'edit-nomination'
            },
            {
                createNominationDto,
                id
            }
        )
    }

    @Delete('/nominations/:id')
    async deleteNomination(@Param('id') id: any) {
        return this.awardService.send(
            {
                cmd: 'delete-nomination'
            },
            {
                id
            }
        )
    }
}
