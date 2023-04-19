import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "../../film/src/models/films_models/films/films.model";
import {PersonService} from "../../film/src/services/person.service";
import {GenreService} from "../../film/src/services/genre.service";

@Injectable()
export class AppService {
    constructor() {}

    getDirectors() {
        return ['Роб Шнайдер']
    }

    getActors() {
        return ['Адам Сендлер', "Билл Найи", "Билл Скарсгард", "Пенелопа Круз"]
    }

    getWriters() {
        return ['Чак Палланик']
    }

    getProducers() {
        return ['Рамзан Кадыров', "Азамат Курчаев"]
    }

    getCinematography() {
        return ['Лоик Реми']
    }

    getDesigners() {
        return ['Михаил Понтожа', 'Курбан Бердыев']
    }

    getMusicians() {
        return ['50 Cent']
    }

    getEditors() {
        return ['Татьяна Кальдерон']
    }

    getGenres() {
        return ['Комедия', 'Фантастика']
    }

    getCountries() {
        return ['США', 'Россия']
    }

    addFiltersToFilterObject(filterObject, filter: string) {
        if (filter.includes('-') || filter.length == 4) {
            filterObject.year = filter;
        } else {
            const splitedFilter = filter.split('+');
            if (splitedFilter[0].length == 2) {
                filterObject.countries = filter;
            } else {
                filterObject.genres = filter;
            }
        }
    }

}