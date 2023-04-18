import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "../models/films_models/films/films.model";
import {Genre} from "../models/genre_models/genre.model";
import {FilmGenres} from "../models/genre_models/film_genres.model";
import {PersonService} from "./person.service";
import {CreateGenreDto} from "../dto/create_genre.dto";
import {Op} from "sequelize";

@Injectable()
export class GenreService {
    constructor(@InjectModel(Genre) private genreRepository: typeof Genre,
                @InjectModel(FilmGenres) private filmGenresRepository: typeof FilmGenres,
                ) {}

    async createGenre(dto: CreateGenreDto) {
        return await this.genreRepository.create(dto);
    }

    async getGenreByName(name: string) {
        return await this.genreRepository.findOne({
            where: {
                name
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

    async getFilmsByGenres(genres) {
        const ids = await this.getIdsByGenresNames(genres);

        return await this.filmGenresRepository.findAll({
            where: {
                genreId: {
                    [Op.in]: ids
                }
            },
            include: Film
        })
    }

    async getIdsByGenresNames(genres) {
        let ids = [];

        for (const genreName of genres) {
            const genre = await this.getGenreByName(genreName);
            ids.push(genre.id);
        }

        return ids;
    }
}