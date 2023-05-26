import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";
import {Genre, FilmGenres, CreateGenreDto, genresMap, UpdateGenreDto} from "@app/common";


@Injectable()
export class GenreService {
    constructor(@InjectModel(Genre) private genreRepository: typeof Genre,
                @InjectModel(FilmGenres) private filmGenresRepository: typeof FilmGenres,
                ) {}

    async createGenre(createGenreDto: CreateGenreDto) {
        const genre =  await this.genreRepository.create(createGenreDto);
        await genre.$set('films', [])

        return genre;
    }

    async getOrCreateGenre(createGenreDto: CreateGenreDto) {
        let genre = await this.getGenreByName(createGenreDto.name);

        if (!genre) {
            genre = await this.createGenre(createGenreDto);
        }

        return genre;
    }

    async getAllGenres() {
        return await this.genreRepository.findAll();
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

    async editGenre(updateGenreDto: UpdateGenreDto, id: number) {
        try {
            await this.genreRepository.update({...updateGenreDto, englishName: genresMap.get(updateGenreDto.name)}, {
                where: {
                    id
                }
            });

            return this.getGenreById(id);
        } catch (e) {
            throw new HttpException("Указанный жанр не может быть использован в качестве имени. Повторите попытку",
                HttpStatus.BAD_REQUEST)
        }

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

    async addGenreInMap(createGenreDto: CreateGenreDto) {
        genresMap.set(createGenreDto.name, createGenreDto.englishName)
    }
}