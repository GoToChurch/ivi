import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";

import {Film, Country, FilmCountries, CreateCountryDto} from "@app/common";


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

    async getOrCreateCounty(dto: CreateCountryDto) {
        let country = await this.getCountryByName(dto.name);

        if (!country) {
            country = await this.createCountry(dto);
        }

        return country;
    }

    async getAllCountries() {
        return await this.countryRepository.findAll();
    }

    async getCountryByName(name: string) {
        return await this.countryRepository.findOne({
            where: {
                name
            },
            include: {
                all: true
            }
        });
    }

    async getCountryByEnglishName(englishName: string) {
        return await this.countryRepository.findOne({
            where: {
                englishName
            },
            include: {
                all: true
            }
        });
    }

    async getCountryById(id: number) {
        return await this.countryRepository.findByPk(id, {
            include: {
                all: true
            }
        });
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
        return await this.countryRepository.destroy({
            where: {
                id
            }
        });
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