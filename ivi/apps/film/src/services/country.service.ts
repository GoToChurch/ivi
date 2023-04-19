import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";
import {Country} from "../models/countries/country.model";
import {FilmCountries} from "../models/countries/film_country.model";
import {CreateCountryDto} from "../dto/create_country.dto";
import {Film} from "../models/films_models/films/films.model";
import {Genre} from "../models/genre_models/genre.model";

@Injectable()
export class CountryService {
    constructor(@InjectModel(Country) private countryRepository: typeof Country,
                @InjectModel(FilmCountries) private filmCountriesRepository: typeof FilmCountries,
    ) {}

    async createCountry(dto: CreateCountryDto) {
        const country = await this.countryRepository.create(dto);
        country.$set('films', []);

        return country;
    }

    async getAllCountries() {
        return await this.countryRepository.findAll();
    }

    async getCountryByName(name: string) {
        return await this.countryRepository.findOne({
            where: {
                name
            }
        });
    }

    async getCountryByEnglishName(englishName: string) {
        return await this.countryRepository.findOne({
            where: {
                englishName
            }
        });
    }
    // async filterCountriesByNames(names) {
    //     return await this.countryRepository.findAll({
    //         where: {
    //             englishName: {
    //                 [Op.in]: names
    //             }
    //         }
    //     });
    // }

    async getCountryById(id: number) {
        return await this.countryRepository.findByPk(id);
    }

    async editCountry(dto: CreateCountryDto, id: number) {
        await this.countryRepository.update({...dto}, {
            where: {
                id
            }
        });

        return this.getCountryById(id);
    }

    async deleteCountry(id: number) {
        await this.countryRepository.destroy({
            where: {
                id
            }
        });
    }

    async addFilmsForCountry(film: Film, country: Country) {
        country.$add('film', film.id)
    }

    async getFilmsIdsByCountries(countries) {
        const splitedGenres = countries.split('+');
        const ids = await this.getIdsByCountriesNames(splitedGenres);
        let filmsIds = [];

        const films = await this.filmCountriesRepository.findAll({
            where: {
                countryId: {
                    [Op.in]: ids
                }
            },
        })

        for (const film of films) {
            filmsIds.push(film.filmId);
        }

        return filmsIds;
    }

    async getIdsByCountriesNames(countries) {
        let ids = [];

        for (const countryName of countries) {
            const country = await this.getCountryByEnglishName(countryName);

            if (country) {
                ids.push(country.id);
            }
        }

        return ids;
    }

}