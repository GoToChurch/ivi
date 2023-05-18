import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Op} from "sequelize";
import {Country, FilmCountries, CreateCountryDto, UpdateCountryDto} from "@app/common";


@Injectable()
export class CountryService {
    constructor(@InjectModel(Country) private countryRepository: typeof Country,
                @InjectModel(FilmCountries) private filmCountriesRepository: typeof FilmCountries,
    ) {}

    async createCountry(dto: CreateCountryDto) {
        const country = await this.countryRepository.create(dto);
        await country.$set("films", []);

        return country;
    }

    async getOrCreateCounty(createCountryDto: CreateCountryDto) {
        let country = await this.getCountryByName(createCountryDto.name);

        if (!country) {
            country = await this.createCountry(createCountryDto);
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

    async editCountry(updateCountryDto: UpdateCountryDto, id: number) {
        await this.countryRepository.update({...updateCountryDto}, {
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