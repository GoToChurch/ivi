import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Award} from "../models/awards/awards.model";
import {Nomination} from "../models/awards/nominations.model";
import {CreateAwardDto} from "../dto/create_award.dto";
import {CreateNominationDto} from "../dto/create_nomination.dto";

@Injectable()
export class AwardService {
    constructor(@InjectModel(Award) private awardRepository: typeof Award,
                @InjectModel(Nomination) private nominationRepository: typeof Nomination,
                ) {}

    async createAward(dto: CreateAwardDto) {
        const award = await this.awardRepository.create(dto);
        await award.$set('nominations', []);

        return award;
    }

    async getAllAwards() {
        return await this.awardRepository.findAll();
    }

    async getAwardById(id: number) {
        return await this.awardRepository.findByPk(id);
    }

    async editAward(dto: CreateAwardDto, id: number) {
        await this.awardRepository.update({...dto}, {
            where: {
                id: id
            }
        });

        return this.getAwardById(id);
    }

    async deleteAward(id: number) {
        return await this.awardRepository.destroy({
            where: {
                id: id
            }
        });
    }

    async createNomination(dto: CreateNominationDto) {
        return await this.nominationRepository.create(dto);
    }

    async getAllNominations() {
        return await this.nominationRepository.findAll();
    }

    async getNominationById(id: number) {
        return await this.nominationRepository.findByPk(id);
    }

    async editNomination(dto: CreateNominationDto, id: number) {
        await this.nominationRepository.update({...dto}, {
            where: {
                id: id
            }
        });

        return this.getAwardById(id);
    }

    async deleteNomination(id: number) {
        return await this.nominationRepository.destroy({
            where: {
                id: id
            }
        });
    }

}