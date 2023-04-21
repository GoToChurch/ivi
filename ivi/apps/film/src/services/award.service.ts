import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Award} from "../models/awards/awards.model";
import {Nomination} from "../models/awards/nominations.model";
import {CreateAwardDto} from "../dto/create_award.dto";
import {CreateNominationDto} from "../dto/create_nomination.dto";
import {Film} from "../models/films_models/films/films.model";
import {FilmAwards} from "../models/awards/film_awards.model";

@Injectable()
export class AwardService {
    constructor(@InjectModel(Award) private awardRepository: typeof Award,
                @InjectModel(FilmAwards) private filmAwardsRepository: typeof FilmAwards,
                @InjectModel(Nomination) private nominationRepository: typeof Nomination,
                ) {}

    async createAward(dto: CreateAwardDto) {
        const award = await this.awardRepository.create(dto);
        await award.$set('nominations', []);

        return award;
    }

    async getOrCreateAward(dto: CreateAwardDto) {
        let award = await this.getAwardByName(dto.name)

        if (!award) {
            award = await this.createAward(dto);
        }

        return award;
    }

    async getAllAwards() {
        return await this.awardRepository.findAll({
            include: Nomination
        });
    }

    async getAwardById(id: number) {
        return await this.awardRepository.findByPk(id, {
            include: Nomination
        });
    }

    async getAwardByName(name: string) {
        return await this.awardRepository.findOne({
            where: {
                name
            }
        });
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

    async getOrCreateNomination(dto: CreateNominationDto) {
        let nomination = await this.getNominationByName(dto.name)

        if (!nomination) {
            nomination = await this.createNomination(dto);
        }

        return nomination;
    }

    async getAllNominations() {
        return await this.nominationRepository.findAll();
    }

    async getNominationById(id: number) {
        return await this.nominationRepository.findByPk(id);
    }

    async getNominationByName(name: string) {
        return await this.nominationRepository.findOne({
            where: {
                name
            }
        });
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

    async addFilmAndNominationsForAward(film: Film, award: Award, nominations) {
        for (const nominationName of nominations) {
            let nomination = await this.getOrCreateNomination({name: nominationName});
            const nominationId = nomination.id

            await award.$add('nomination', nominationId);

            let filmAward = await this.filmAwardsRepository.findOne({
                where: {
                    filmId: film.id,
                    awardId: award.id
                }
            });

            if (filmAward.nominationId != nominationId) {
                filmAward.nominationId = nominationId
            }

            filmAward.save();
        }
    }

}