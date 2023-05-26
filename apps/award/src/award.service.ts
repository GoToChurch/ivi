import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Award, CreateAwardDto, CreateNominationDto, Film, FilmAwards, Nomination, UpdateAwardDto} from "@app/common";


@Injectable()
export class AwardService {
    constructor(@InjectModel(Award) private awardRepository: typeof Award,
                @InjectModel(FilmAwards) private filmAwardsRepository: typeof FilmAwards,
                @InjectModel(Nomination) private nominationRepository: typeof Nomination,
                ) {}

    async createAward(createAwardDto: CreateAwardDto) {
        const award = await this.awardRepository.create(createAwardDto);
        await award.$set("nominations", []);

        return award;

    }

    async getOrCreateAward(createAwardDto: CreateAwardDto) {
        let award = await this.getAwardByNameAndYear(createAwardDto.name, createAwardDto.year)

        if (!award) {
            award = await this.createAward(createAwardDto);
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

    async getAwardByNameAndYear(name: string, year: number) {
        return await this.awardRepository.findOne({
            where: {
                name,
                year
            }
        });
    }

    async editAward(updateAwardDto: UpdateAwardDto, id: number) {
        await this.awardRepository.update({...updateAwardDto}, {
            where: {
                id
            }
        });

        return this.getAwardById(id);
    }

    async deleteAward(id: number) {
        return await this.awardRepository.destroy({
            where: {
                id
            }
        });
    }

    async createNomination(createNominationDto: CreateNominationDto) {
        return await this.nominationRepository.create(createNominationDto);
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

    async editNomination(createNominationDto: CreateNominationDto, id: number) {
        await this.nominationRepository.update({...createNominationDto}, {
            where: {
                id
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

    async addFilmAndNominationsForAward(film: Film, awardDto, nominations) {
        for (const nominationDto of nominations) {
            let nomination = await this.getOrCreateNomination(nominationDto);
            const nominationId = nomination.id;

            let award = await this.getAwardByNameAndYear(awardDto.name, awardDto.year);
            await award.$add("nomination", nominationId);

            let filmAward = await this.filmAwardsRepository.findOne({
                where: {
                    filmId: film.id,
                    awardId: award.id
                }
            });

            if (filmAward.nominationId != nominationId) {
                filmAward.nominationId = nominationId
            }

            await filmAward.save();
        }

        return await this.getAwardByNameAndYear(awardDto.name, awardDto.year);
    }
}