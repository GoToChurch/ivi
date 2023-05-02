import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "@app/common";
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

    async addRelatedFilm (id: number, relatedFilmName) {
        const relatedFilm = await this.filmService.getFilmByName(relatedFilmName);
        const film = await this.filmService.getFilmById(id);

        if (relatedFilm) {
            await film.$add('relatedFilm', relatedFilm.id)
        } else {
            throw new BadRequestException();
        }
    }

    async addDirector(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'director');
    }

    async addActor(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'actor');
    }

    async addWriter(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'writer');
    }

    async addProducer(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'producer');
    }

    async addCinematography(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'cinematography');
    }

    async addMusician(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'musician');
    }

    async addDesigner(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'designer');
    }

    async addEditor(filmId: number, personName) {
        await this.addCreator(filmId, personName, 'editor');
    }

    async addCreator(filmId: number, personName, professionName) {
        const person = await lastValueFrom(this.personService.send({
                    cmd: 'get-person-by-name'
                },
                {
                    name: personName
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