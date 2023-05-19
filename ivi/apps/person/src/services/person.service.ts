import {Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {Op} from "sequelize";
import {
    Film,
    Person,
    Profession,
    PersonFilms,
    CreatePersonDto,
    CreateProfessionDto,
    UpdatePersonDto, UpdateProfessionDto
} from "@app/common";
import {ProfessionService} from "./profession.service";


@Injectable()
export class PersonService {
    constructor(@InjectModel(Person) private personRepository: typeof Person,
                @InjectModel(Profession) private professionepository: typeof Profession,
                @InjectModel(PersonFilms) private personFilmsRepository: typeof PersonFilms,
                @Inject("FILM") private readonly filmClient: ClientProxy,
                private readonly professionService: ProfessionService) {}

    async createPerson(createPersonDto: CreatePersonDto) {
        const person = await this.personRepository.create(createPersonDto);
        await person.$set("films", []);
        await person.$set("professions", []);

        return person;
    }

    async getOrCreatePerson(createPersonDto: CreatePersonDto) {
        let person = await this.getPersonByName(createPersonDto.name);

        if (!person) {
            person = await this.createPerson(createPersonDto);
        }

        return person;
    }

    async getAllPersons(query?) {
        let persons;

        if (query.limit) {
            persons = await this.personRepository.findAll({
                limit: query.limit
            });
        } else {
            persons = await this.personRepository.findAll();
        }

        return persons;
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
            },
            include: {
                all: true
            }
        })
    }

    async searchPersons(query) {
        let persons = [];

        if (query) {
            if (query.name) {
                persons = await this.personRepository.findAll({
                    where: {
                        [Op.or]: {
                            name: {
                                [Op.iLike]: `${query.name}%`
                            },
                            originalName: {
                                [Op.iLike]: `${query.name}%`
                            }
                        }
                    },
                    include: Profession
                })
            }
            if (query.profession) {
                persons = this.filterPersonsByProfession(persons, query.profession)
            }
        }

        return persons;
    }

    filterPersonsByProfession(persons, profession) {
        let filterResult = [];

        for (const person of persons) {
            for (const prof of person.professions) {
                if (prof.name == profession) {
                    filterResult.push(person);
                }
            }
        }
        return filterResult
    }

    async getAllPersonsFilms(id: number) {
        const person = await this.getPersonById(id);

        return person.films;
    }

    async getAllPersonsFilmsByProfession(personId: number, professionId: number) {
        const profession = await this.professionService.getProfessionById(professionId);
        const person = await this.getPersonById(personId);

        const personFilms = await this.personFilmsRepository.findAll({
            where: {
                personId: person.id,
                professionId: profession.id,
            },
            include: {
                all: true
            }
        })

        let result = [];

        for (const film of personFilms) {
            result.push(await lastValueFrom(this.filmClient.send({
                        cmd: "get-film",
                    },
                    {
                        id: film.filmId,
                    })
            ))
        }

        return result;
    }

    async getAllPersonsProfessions(id: number) {
        const person = await this.getPersonById(id);

        return person.professions;
    }

    async editPerson(updatePersonDto: UpdatePersonDto, id: number) {
        await this.personRepository.update({...updatePersonDto}, {
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

    async addFilmForPerson(personDto, film: Film) {
        const person = await this.getPersonByName(personDto.name);
        await person.$add("film", film.id);
        return person;
    }

    async addProfessionInFilmForPerson(film: Film, personDto: Person, profession: Profession) {
        const professionId = profession.id;
        const person = await this.getPersonById(personDto.id)

        await person.$add("profession",professionId);

        const filmProfession = await this.personFilmsRepository.findOne({
            where: {
                personId: personDto.id,
                filmId: film.id
            }
        });

        if (filmProfession.professionId) {
            await this.createPersonFilm(film.id, personDto.id, professionId)
        } else {
            filmProfession.professionId = professionId;
            await filmProfession.save();
        }

        return filmProfession;
    }

    async createPersonFilm(filmId, personId, professionId) {
        return await this.personFilmsRepository.create({
            filmId: +filmId,
            personId: +personId,
            professionId: +professionId}
        )
    }

    async addProfessionForPerson(personId, createProfessionDto) {
        const person = await this.getPersonById(personId);
        const profession = await this.professionService.getProfessionByName(createProfessionDto.name);
        await person.$add("profession", profession.id);
        return person;
    }

    async addProfessionsForPerson(person: Person, professions) {
        for (const professionName of professions) {
            const profession = await this.professionService.getOrCreateProfession(professionName);
            await person.$add("profession", profession.id)
        }
    }
}
