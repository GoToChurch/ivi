import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {AddPersonDto, AddRelatedFilmDto, Film} from "@app/common";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {FilmService} from "./film.service";

@Injectable()
export class AdminService {
    constructor(@InjectModel(Film) private filmRepository: typeof Film,
                @Inject('PERSON') private readonly personService: ClientProxy,
                @Inject('GENRE') private readonly genreService: ClientProxy,
                @Inject('AWARD') private readonly awardService: ClientProxy,
                @Inject('COUNTRY') private readonly countryService: ClientProxy,
                private filmService: FilmService) {
    }

    async addRelatedFilm (id: number, relatedFilmDto: AddRelatedFilmDto) {
        const relatedFilm = await this.filmService.getFilmById(relatedFilmDto.id);
        const film = await this.filmService.getFilmById(id);

        if (relatedFilm) {
            await film.$add('relatedFilm', relatedFilm.id);
            await relatedFilm.$add('relatedFilm', film.id);
        } else {
            throw new BadRequestException();
        }
    }

    async addDirector(filmId: number, personDto: AddPersonDto) {
        await this.addCreator(filmId, personDto.id, 'director');
    }

    async addActor(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'actor');
    }

    async addWriter(filmId: number, personDto: AddPersonDto) {
        await this.addCreator(filmId, personDto.id, 'writer');
    }

    async addProducer(filmId: number, personDto: AddPersonDto) {
        await this.addCreator(filmId, personDto.id, 'producer');
    }

    async addCinematography(filmId: number, personDto: AddPersonDto) {
        await this.addCreator(filmId, personDto.id, 'cinematography');
    }

    async addMusician(filmId: number, personDto: AddPersonDto) {
        await this.addCreator(filmId, personDto.id, 'musician');
    }

    async addDesigner(filmId: number, personDto: AddPersonDto) {
        await this.addCreator(filmId, personDto.id, 'designer');
    }

    async addEditor(filmId: number, personDto: AddPersonDto) {
        await this.addCreator(filmId, personDto.id, 'editor');
    }

    async addCreator(filmId: number, personId, professionName) {
        const person = await lastValueFrom(this.personService.send({
                    cmd: 'get-person-by-id'
                },
                {
                    id: personId
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        if (person) {
            await film.$add(professionName, person.id);
        } else {
            throw new BadRequestException();
        }

    }

    async addGenre(filmId: number, genreName) {
        const genre = await lastValueFrom(this.genreService.send({
                    cmd: 'get-genre-by-name'
                },
                {
                    name: genreName
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        if (genre) {
            await film.$add('genre', genre.id);
        } else {
            throw new BadRequestException();
        }
    }

    async addCountry(filmId: number, countryName) {
        const country = await lastValueFrom(this.countryService.send({
                    cmd: 'get-country-by-name'
                },
                {
                    name: countryName
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        if (country) {
            await film.$add('country', country.id);
        } else {
            throw new BadRequestException();
        }
    }

    async addAward(filmId: number, awardName) {
        const award = await lastValueFrom(this.awardService.send({
                    cmd: 'get-award-by-name'
                },
                {
                    name: awardName
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        if (award) {
            await film.$add('award', award.id);
        } else {
            throw new BadRequestException();
        }

    }
}