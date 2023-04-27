import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";

import {Film, Genre, FilmGenres, CreateGenreDto} from "@app/common";


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

    async getOrCreateGenre(dto) {
        let genre = await this.getGenreByName(dto.name);

        if (!genre) {
            genre = await this.createGenre(dto);
        }

        return genre;
    }

    async getAllGenres() {
        return await this.genreRepository.findAll({
            include: {
                all: true
            }
        });
    }

    async getGenreByName(name: string) {
        return await this.genreRepository.findOne({
            where: {
                name
            },
            include: {
                all: true
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

    async getGenreById(id: number) {
        return await this.genreRepository.findByPk(id, {
            include: {
                all: true
            }
        });
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
        return await this.genreRepository.destroy({
            where: {
                id
            }
        });
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