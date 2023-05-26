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
        return await this.addCreator(filmId, addPersonDto, "Режиссер","director");
    }

    async addActor(filmId: number, addPersonDto: AddPersonDto) {
        return await this.addCreator(filmId, addPersonDto, "Актер","actor");
    }

    async addWriter(filmId: number, addPersonDto: AddPersonDto) {
        return await this.addCreator(filmId, addPersonDto, "Сценарист","writer");
    }

    async addProducer(filmId: number, addPersonDto: AddPersonDto) {
        return await this.addCreator(filmId, addPersonDto, "Продюсер","producer");
    }

    async addCinematography(filmId: number, addPersonDto: AddPersonDto) {
        return await this.addCreator(filmId, addPersonDto, "Оператор","cinematography");
    }

    async addMusician(filmId: number, addPersonDto: AddPersonDto) {
        return await this.addCreator(filmId, addPersonDto, "Композитор","musician");
    }

    async addDesigner(filmId: number, addPersonDto: AddPersonDto) {
        return await this.addCreator(filmId, addPersonDto, "Художник","designer");
    }

    async addEditor(filmId: number, addPersonDto: AddPersonDto) {
        return await this.addCreator(filmId, addPersonDto, "Монтажер", "editor");
    }

    async addCreator(filmId: number, addPersonDto, professionRusName, professionEngName) {
        const profession  = await lastValueFrom(this.personClient.send({
                    cmd: "get-profession-by-name"
                },
                {
                    name: professionRusName
                })
        );

        const film = await this.filmService.getFilmById(filmId);

        await this.filmService.addInfoForPesronAndFilm(film, [addPersonDto], profession, professionEngName);

        return film;

    }

    async addGenre(filmId: number, addGenreDto: AddGenreDto) {
        const film = await this.filmService.getFilmById(filmId);

        await this.filmService.addGenresForFilm(film, [addGenreDto]);

        return film;

    }

    async addCountry(filmId: number, addCountryDto: AddCountryDto) {
        const film = await this.filmService.getFilmById(filmId);

        await this.filmService.addCountriesForFilm(film, [addCountryDto]);

        return film;
    }

    async addAward(filmId: number, addAwardDto: AddAwardDto) {
        const film = await this.filmService.getFilmById(filmId);

        await this.filmService.addAwardsForFilm(film, [addAwardDto]);

        return film;

    }
}