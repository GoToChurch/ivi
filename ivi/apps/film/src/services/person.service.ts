import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "../models/films_models/films/films.model";
import {Person} from "../models/persons_models/persons.model";
import {Profession} from "../models/persons_models/professions.model";
import {PersonFilms} from "../models/persons_models/person_films.model";
import {CreatePersonDto} from "../dto/create_person.dto";
import {CreateProfessionDto} from "../dto/create_profession.dto";

@Injectable()
export class PersonService {
    constructor(@InjectModel(Person) private personRepository: typeof Person,
                @InjectModel(Profession) private professionepository: typeof Profession,
                @InjectModel(PersonFilms) private personFilmsRepository: typeof PersonFilms,) {}

    async createPerson(dto: CreatePersonDto) {
        const person = await this.personRepository.create(dto);
        await person.$set('films', []);
        await person.$set('professions', []);

        return person;
    }

    async getAllPersons() {
        return await this.personRepository.findAll({
            include: {
                all: true
            },
        });
    }

    async getPersonById(id: number) {
        return await this.personRepository.findByPk(id, {
            include: {
                all: true
            },
        });
    }

    async getPersonByName(name: string) {
        return await this.personRepository.findOne({
            where: {
                name
            }
        })
    }

    async getAllPersonsFilms(name: string) {
        const person = await this.getPersonByName(name);

        return person.films;
    }

    async getAllPersonsFilmsByProfession(personsName: string, personsProfession: string) {
        const profession = await this.getProfessionByName(personsProfession);
        const person = await this.getPersonByName(personsName);

        return await this.personFilmsRepository.findAll({
            where: {
                personId: person.id,
                professionId: profession.id,
            },
            include: Film,
        })
    }

    async editPerson(dto: CreatePersonDto, id: number) {
        await this.personRepository.update({...dto}, {
            where: {
                id
            }
        });

        return this.getPersonById(id);
    }

    async deletePerson(id: number) {
        await this.personRepository.destroy({
            where: {
                id
            }
        });
    }

    async addFilmForPerson(person: Person, film: Film) {
        await person.$add('film', film.id)
    }

    async addProfessionForPerson(person: Person, profession: Profession) {
        await person.$add('profession', profession.id)
    }

    async addProfessionInFilmForPerson(film: Film, person: Person, profession: Profession) {
        const filmProfession = await this.personFilmsRepository.findOne({
            where: {
                personId: person.id,
                filmId: film.id
            }
        })

        const professionId = profession.id

        if (filmProfession === null || filmProfession.professionId != professionId) {
            filmProfession.professionId = professionId
        }

        filmProfession.save();
    }

    async createProfession(dto: CreateProfessionDto) {
        return await this.professionepository.create(dto);
    }

    async getAllProfessions() {
        return await this.professionepository.findAll();
    }

    async getProfessionById(id: number) {
        return await this.professionepository.findByPk(id);
    }

    async getProfessionByName(name: string) {
        return await this.professionepository.findOne({
            where: {
                name
            }
        })
    }

    async editProfession(dto: CreateProfessionDto, id: number) {
        await this.professionepository.update({...dto}, {
            where: {
                id
            }
        });

        return this.getProfessionById(id);
    }

    async deleteProfession(id: number) {
        await this.professionepository.destroy({
            where: {
                id
            }
        })
    }

    async getOrCreateProfession(name) {
        let profession = await this.getProfessionByName(name);

        if(!profession) {
            profession = await this.createProfession({name});
        }

        return profession;
    }
}
