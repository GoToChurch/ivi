import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "../models/films_models/films/films.model";
import {Genre} from "../models/genre_models/genre.model";
import {FilmGenres} from "../models/genre_models/film_genres.model";
import {CreateGenreDto} from "../dto/create_genre.dto";
import {Op} from "sequelize";

@Injectable()
export class GenreService {
    constructor(@InjectModel(Genre) private genreRepository: typeof Genre,
                @InjectModel(FilmGenres) private filmGenresRepository: typeof FilmGenres,
                ) {}

    async createGenre(dto: CreateGenreDto) {
        const genre =  await this.genreRepository.create(dto);
        genre.$set('films', [])

        return genre;
    }

    async getAllGenres() {
        return await this.genreRepository.findAll();
    }

    async getGenreByName(name: string) {
        return await this.genreRepository.findOne({
            where: {
                name
            }
        });
    }

    async getGenreByEnglishName(englishName: string) {
        return await this.genreRepository.findOne({
            where: {
                englishName
            }
        });
    }

    async filterGenresByName(names) {
        return await this.genreRepository.findAll({
            where: {
                englishName: {
                    [Op.in]: names
                }
            }
        });
    }

    async getGenreById(id: number) {
        return await this.genreRepository.findByPk(id);
    }

    async editGenre(name: string, id: number) {
        await this.genreRepository.update({name}, {
            where: {
                id
            }
        });

        return this.getGenreById(id);
    }

    async deleteGenre(id: number) {
        await this.genreRepository.destroy({
            where: {
                id
            }
        });
    }

    async addFilmsForGenre(film: Film, genre: Genre) {
        genre.$add('film', film.id)
    }

    async getFilmsIdsByGenres(genres) {
        const splitedGenres = genres.split('+');
        const ids = await this.getIdsByGenresNames(splitedGenres);
        let filmsIds = [];

        const films = await this.filmGenresRepository.findAll({
            where: {
                genreId: {
                    [Op.in]: ids
                }
            },
        })

        for (const film of films) {
            filmsIds.push(film.filmId);
        }

        return filmsIds;
    }

    async getIdsByGenresNames(genres) {
        let ids = [];

        for (const genreName of genres) {
            const genre = await this.getGenreByEnglishName(genreName);

            if (genre) {
                ids.push(genre.id);
            }

        }

        return ids;
    }
}