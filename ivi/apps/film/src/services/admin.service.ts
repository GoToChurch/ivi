import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {FilmService} from "./film.service";
import {AddAwardDto, AddCountryDto, AddGenreDto, AddPersonDto, AddRelatedFilmDto, Film} from "@app/common";


@Injectable()
export class AdminService {
    constructor(@InjectModel(Film) private filmRepository: typeof Film,
                @Inject("PERSON") private readonly personClient: ClientProxy,
                @Inject("GENRE") private readonly genreClient: ClientProxy,
                @Inject("AWARD") private readonly awardClient: ClientProxy,
                @Inject("COUNTRY") private readonly countryClient: ClientProxy,
                private filmService: FilmService) {}

    async addRelatedFilm (id: number, addRelatedFilmDto: AddRelatedFilmDto) {
        const relatedFilm = await this.filmService.getFilmById(addRelatedFilmDto.id);
        const film = await this.filmService.getFilmById(id);

        if (relatedFilm) {
            await film.$add("relatedFilm", relatedFilm.id);
            await relatedFilm.$add("relatedFilm", film.id);
            return film;
        } else {
            throw new HttpException("Неовзможно добавить связанный фильм, т.к. его не существует",
                HttpStatus.BAD_REQUEST);
        }
    }

    async addDirector(filmId: number, addPersonDto: AddPersonDto) {
        await this.addCreator(filmId, addPersonDto.id, "director");
    }

    async addActor(filmId: number, addPersonDto: AddPersonDto) {
        await this.addCreator(filmId, addPersonDto.id, "actor");
    }

    async addWriter(filmId: number, addPersonDto: AddPersonDto) {
        await this.addCreator(filmId, addPersonDto.id, "writer");
    }

    async addProducer(filmId: number, addPersonDto: AddPersonDto) {
        await this.addCreator(filmId, addPersonDto.id, "producer");
    }

    async addCinematography(filmId: number, addPersonDto: AddPersonDto) {
        await this.addCreator(filmId, addPersonDto.id, "cinematography");
    }

    async addMusician(filmId: number, addPersonDto: AddPersonDto) {
        await this.addCreator(filmId, addPersonDto.id, "musician");
    }

    async addDesigner(filmId: number, addPersonDto: AddPersonDto) {
        await this.addCreator(filmId, addPersonDto.id, "designer");
    }

    async addEditor(filmId: number, addPersonDto: AddPersonDto) {
        await this.addCreator(filmId, addPersonDto.id, "editor");
    }

    async addCreator(filmId: number, personId, professionName) {
        const person = await lastValueFrom(this.personClient.send({
                    cmd: "get-person-by-id"
                },
                {
                    id: personId
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        if (person) {
            await film.$add(professionName, person.id);
        } else {
            throw new HttpException("Неовзможно добавить персону, т.к. её не существует",
                HttpStatus.BAD_REQUEST);
        }

    }

    async addGenre(filmId: number, addGenreDto: AddGenreDto) {
        const genre = await lastValueFrom(this.genreClient.send({
                    cmd: "get-genre-by-name"
                },
                {
                    name: addGenreDto.name
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        if (genre) {
            await film.$add("genre", genre.id);
        } else {
            throw new HttpException("Неовзможно добавить жанр, т.к. его не существует",
                HttpStatus.BAD_REQUEST);
        }
    }

    async addCountry(filmId: number, addCountryDto: AddCountryDto) {
        const country = await lastValueFrom(this.countryClient.send({
                    cmd: "get-country-by-name"
                },
                {
                    name: addCountryDto.name
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        if (country) {
            await film.$add("country", country.id);
        } else {
            throw new HttpException("Неовзможно добавить страну, т.к. её не существует",
                HttpStatus.BAD_REQUEST);
        }
    }

    async addAward(filmId: number, addAwardDto: AddAwardDto) {
        const award = await lastValueFrom(this.awardClient.send({
                    cmd: "get-award-by-name-and-year"
                },
                {
                    name: addAwardDto.name,
                    year: addAwardDto.year
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        if (award) {
            await film.$add("award", award.id);
        } else {
            throw new HttpException("Неовзможно добавить награду, т.к. её не существует",
                HttpStatus.BAD_REQUEST);
        }
    }
}