import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Profession, CreateProfessionDto, UpdateProfessionDto} from "@app/common";


@Injectable()
export class ProfessionService {
    constructor(@InjectModel(Profession) private professionRepository: typeof Profession) {}

    async createProfession(createProfessionDto: CreateProfessionDto) {
        return await this.professionRepository.create(createProfessionDto);
    }

    async getOrCreateProfession(name) {
        let profession = await this.getProfessionByName(name);

        if(!profession) {
            profession = await this.createProfession({name});
        }

        return profession;
    }

    async getAllProfessions() {
        return await this.professionRepository.findAll();
    }

    async getProfessionById(id: number) {
        return await this.professionRepository.findByPk(id, {
            include: {
                all: true
            },
        });
    }

    async getProfessionByName(name: string) {
        return await this.professionRepository.findOne({
            where: {
                name
            }
        })
    }

    async editProfession(updateProfessionDto: UpdateProfessionDto, id: number) {
        await this.professionRepository.update({...updateProfessionDto}, {
            where: {
                id
            }
        });

        return this.getProfessionById(id);
    }

    async deleteProfession(id: number) {
        return await this.professionRepository.destroy({
            where: {
                id
            }
        })
    }
}
