import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Profession, CreateProfessionDto, UpdateProfessionDto} from "@app/common";


@Injectable()
export class ProfessionService {
    constructor(@InjectModel(Profession) private professionepository: typeof Profession) {}

    async createProfession(createProfessionDto: CreateProfessionDto) {
        return await this.professionepository.create(createProfessionDto);
    }

    async getOrCreateProfession(name) {
        let profession = await this.getProfessionByName(name);

        if(!profession) {
            profession = await this.createProfession({name});
        }

        return profession;
    }

    async getAllProfessions() {
        return await this.professionepository.findAll();
    }

    async getProfessionById(id: number) {
        return await this.professionepository.findByPk(id, {
            include: {
                all: true
            },
        });
    }

    async getProfessionByName(name: string) {
        return await this.professionepository.findOne({
            where: {
                name
            }
        })
    }

    async editProfession(updateProfessionDto: UpdateProfessionDto, id: number) {
        await this.professionepository.update({...updateProfessionDto}, {
            where: {
                id
            }
        });

        return this.getProfessionById(id);
    }

    async deleteProfession(id: number) {
        return await this.professionepository.destroy({
            where: {
                id
            }
        })
    }


}
