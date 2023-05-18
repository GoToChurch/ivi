import {HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {CreateFilmDto, Driver} from "@app/common";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";

const axios = require("axios");
const cheerio = require("cheerio");
const {By, until} = require("selenium-webdriver");


@Injectable()
export class AppService {
    constructor(@Inject("FILM") private readonly filmClient: ClientProxy) {}

    addFiltersToFilterObject(filterObject, filter: string) {
        if (filter.includes("-") || filter.length == 4) {
            filterObject.year = filter;
        } else {
            const splitedFilter = filter.split("+");
            if (splitedFilter[0].length == 2) {
                filterObject.countries = filter;
            } else {
                filterObject.genres = filter;
            }
        }
    }

    async createFilmInDataBase(filmObject) {
        try {
            let createdFilm = await lastValueFrom(this.filmClient.send(
                {
                    cmd: "create-film",
                },
                {
                    createFilmDto: filmObject.film,
                    directors: filmObject.creators.directors,
                    actors: filmObject.creators.actors,
                    writers: filmObject.creators.writers,
                    producers: filmObject.creators.producers,
                    cinematography: filmObject.creators.cinematography,
                    musicians: filmObject.creators.musicians,
                    designers: filmObject.creators.designers,
                    editors: filmObject.creators.editors,
                    genres: filmObject.genres,
                    countries: filmObject.countries,
                    awards: filmObject.awards,
                    relatedFilms: filmObject.relatedFilms,
                })
            );
        } catch (e) {
            throw new HttpException("Произошла ошибка на сервере при создании фильма", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async parseFilms(query) {
        const from = query.from ? query.from : 1;
        const to = query.to ? query.to : 2;
        const limit = query.limit ? query.limit : 10;

        if (![10, 25, 50, 75, 100, 200].includes(limit)) {
            throw new HttpException("Фильмов на странице может быть только 10, 25, 50, 75, 100, 200", HttpStatus.BAD_REQUEST);
        }

        const api_key = process.env.API_KEY;

        for (let i = from; i < to; i++) {
            let url = `https://api.kinopoisk.dev/v1.3/movie?page=${i}&limit=${limit}`
            let f = await fetch(url,{
                method: "GET",
                headers: {"content-type": "application/json; charset=UTF-8", "X-API-Key": api_key}
            })
            const response = await f.json();
            const driver = await new Driver();

            for (let film of response.docs) {
                try {
                    await driver.startDriver();
                    await this.createFilmInDataBase(await this.parseFilm(film.id, api_key, driver.getDriver()));
                } catch (e) {
                    continue
                }
            }
        }

    }

    async parseOneFilm(id) {
        let api_key = process.env.API_KEY;
        const driver = await new Driver();
        await driver.startDriver();

        await this.createFilmInDataBase(await this.parseFilm(id, api_key, driver.getDriver()));
    }

    async parseFilm(id, api_key, driver) {
        let filmUrl = `https://api.kinopoisk.dev/v1.3/movie/${id}`;
        let filmResponse = null;

        try {
            let fetchRes = await fetch(filmUrl,{
                method: "GET",
                headers: {"content-type": "application/json; charset=UTF-8", "X-API-Key": api_key}
            })
            filmResponse = await fetchRes.json();
        } catch (e) {
            throw new HttpException("Произошла ошибка при попытке запроса к api кинопоиска", HttpStatus.BAD_REQUEST);
        }

        const film = await this.parseFilmInfo(filmResponse, api_key);

        const creators = this.parseCreators(filmResponse);

        const genres = filmResponse.genres;
        const countries = await this.parseCountries(filmResponse);


        let relatedFilms = [];

        for (let relatedFilm of filmResponse.similarMovies) {
            relatedFilms.push({
                name: relatedFilm.name,
                originalName: relatedFilm.alternativeName
            })
        }

        const awards = await this.getAwardsData(driver, `https://www.kinopoisk.ru/film/${filmResponse.id}/`);

        return {
            film,
            creators,
            genres,
            countries,
            awards,
            relatedFilms
        }
    }

    async parseFilmInfo(filmResponse, api_key) {
        let film: CreateFilmDto = {
            name: "",
            originalName: "",
            poster: "",
            trailer: "",
            mpaaRating: "",
            rating: 0,
            ratingsNumber: 0,
            year: 0,
            duration: 0,
            description: ""
        };

        const name = filmResponse.name;
        if (name) {
            film.name = name;
        }

        const originalName = filmResponse.alternativeName;

        if (originalName) {
            film.originalName = originalName;
        } else {
            film.originalName = name;
        }

        const poster = filmResponse.poster.url;
        if (poster) {
            film.poster = poster;
        }

        const trailer = filmResponse.videos.trailers[0].url;
        if (trailer) {
            film.trailer = trailer;
        }

        const rating = Number(filmResponse.rating.kp.toFixed(2));
        if (rating) {
            film.rating = rating;
        }

        const mpaaRating = filmResponse.ageRating + "+";
        if (mpaaRating) {
            film.mpaaRating = mpaaRating;
        }

        const ratingsNumber = filmResponse.votes.kp;
        if (ratingsNumber) {
            film.ratingsNumber = ratingsNumber;
        }

        const description = filmResponse.description;
        if (description) {
            film.description = description;
        }

        const year = filmResponse.year;
        if (year) {
            film.year = year;
        }

        const duration = filmResponse.movieLength;
        if (duration) {
            film.duration = duration;
        } else {
            let serialUrl = `https://api.kinopoisk.dev/v1/season?page=1&limit=100&movieId=${filmResponse.id}`
            let serialResponse = null;

            try {
                let fetchRes = await fetch(serialUrl,{
                    method: "GET",
                    headers: {"content-type": "application/json; charset=UTF-8", "X-API-Key": api_key}
                })
                serialResponse = await fetchRes.json();
            } catch (e) {
                throw new HttpException("Произошла ошибка при попытке запроса к api кинопоиска", HttpStatus.BAD_REQUEST)
            }

            const docs = serialResponse.docs
            film.duration = docs[docs.length - 1].number;
        }

        return film;
    }

    parseCreators(filmResponse) {
        let directors = [];
        let writers = [];
        let actors = [];
        let producers = [];
        let cinematography = [];
        let musicians = [];
        let designers = [];
        let editors = [];
        const persons = filmResponse.persons

        for (const person of persons) {
            let personDto = {
                name: "",
                originalName: "",
                photo: "",
                professions: []
            }

            const name = person.name
            const originalName = person.enName;

            personDto.name = name ? name : originalName;
            personDto.originalName = originalName ? originalName : name;

            const photo = person.photo;

            if (photo) {
                personDto.photo = person.photo;
            }
            switch (person.profession) {
                case "продюсеры":
                    personDto.professions.push("Продюсер");
                    producers.push(personDto);
                    break;

                case "режиссеры":
                    personDto.professions.push("Режиссер");
                    directors.push(personDto);
                    break;

                case "актеры":
                    personDto.professions.push("Актер");

                    if (actors.length <= 50) {
                        actors.push(personDto);
                    }
                    break;

                case "операторы":
                    personDto.professions.push("Оператор");
                    cinematography.push(personDto);
                    break;

                case "редакторы":
                    personDto.professions.push("Сценарист");
                    writers.push(personDto);
                    break;

                case "художники":
                    personDto.professions.push("Художник");
                    designers.push(personDto);
                    break;

                case "монтажеры":
                    personDto.professions.push("Монтажер");
                    editors.push(personDto);
                    break;

                case "композиторы":
                    personDto.professions.push("Композитор");
                    musicians.push(personDto);
                    break;
            }
        }

        return {
            directors,
            actors,
            writers,
            producers,
            cinematography,
            musicians,
            designers,
            editors,
        }
    }

    async parseCountries(filmResponse) {
        let countries = filmResponse.countries;

        for (let country of countries) {
            const { data } = await axios.get(
                "https://ru.wikipedia.org/wiki/Список_доменов_верхнего_уровня"
            );
            const $ = cheerio.load(data);

            country.englishName = $(`span:contains(${country.name})`).closest("tr").text().substring(2,4);
        }

        return countries;
    }

    async getAwardsData(driver, link) {
        await driver.get(link);
        let awards = [];

        try {
            await driver.findElement(By.xpath(`//div[contains(@class, 'styles_awards')]/a`)).click();
            const awardsElements = await driver.findElements(By.xpath(`//table//td//table[@class='js-rum-hero']//
            table[contains(@style, 'background')]`));

            for (let i = 1; i <= awardsElements.length; i++) {
                let award = {
                    name: "",
                    year: 0,
                    nominations: []
                }

                let name = await driver.wait(until.elementLocated(By.xpath(`//table//td//table[@class='js-rum-hero']
                //table[contains(@style, 'background')][${i}]//b`)), 20000);

                name = (await name.getText()).split(", ");
                award.name = name[0];
                award.year = Number(name[1].replace(" год", ""));

                const nominatoinsElements = await driver.findElements(
                    By.xpath(`//a[contains(text(),'${name[0]}, ${name[1]}')]/parent::b/parent::td/parent::tr
                    /parent::tbody//b[text()='Победитель']/ancestor::tr/following-sibling::tr[1]//ul//li`)
                );

                if (nominatoinsElements.length > 0) {
                    for (let k = 1; k <= nominatoinsElements.length; k++) {
                        award.nominations.push({
                            name: await driver.findElement(
                                By.xpath(`//a[contains(text(),'${name[0]}')]/parent::b/parent::td/parent::tr/parent::tbody
                                //b[text()='Победитель']/ancestor::tr/following-sibling::tr[1]//ul//li[${k}]//a`)
                            ).getText()
                        })
                    }
                    awards.push(award);
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            await driver.quit();
        }
        return awards;
    }

    // async getUserByEmail(email: string) {
    //     const user = await this.usersRep.findOne({where: {email: email}, include: {all: true}});
    //     return user;
    // };
}