import {BadRequestException, HttpException, HttpStatus, Inject, Injectable} from "@nestjs/common";
import {CreateFilmDto} from "@app/common";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {spawnSync} from "child_process";

const axios = require('axios');
const cheerio = require('cheerio');
const {By, until} = require('selenium-webdriver');

@Injectable()
export class AppService {

    constructor(@Inject('FILM') private readonly filmService: ClientProxy) {
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

    async createDriver() {
        require('chromedriver');
        const {Builder} = require('selenium-webdriver');
        return await new Builder()
            .forBrowser('chrome').build();
            // .usingServer('http://chrome:4444/wd/hub')

    }

    async createFilmInDataBase(filmObject) {
        let createdFilm = await lastValueFrom(this.filmService.send(
            {
                cmd: 'create-film',
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
    }

    async parseFilms(query) {
        const from = query.from ? query.from : 1;
        const to = query.to ? query.to : 2;
        const limit = query.limit ? query.limit : 10;
        if (![10, 25, 50, 75, 100, 200].includes(limit)) {
            throw new HttpException("Фильмов на странице может быть только 10, 25, 50, 75, 100, 200", HttpStatus.BAD_REQUEST)
        }

        const api_key = process.env.API_KEY;

        for (let i = from; i < to; i++) {
            let url = `https://api.kinopoisk.dev/v1.3/movie?page=${i}&limit=${limit}`
            let f = await fetch(url,{
                method: 'GET',
                headers: {"content-type": "application/json; charset=UTF-8", 'X-API-Key': api_key}
            })
            const resp = await f.json();

            for (let film of resp.docs) {
                const driver = await this.createDriver();
                await this.createFilmInDataBase(await this.parseFilm(film.id, api_key, driver))
            }
        }

    }

    async parseOneFilm(id) {
        let api_key = process.env.API_KEY;
        const driver = await this.createDriver();

        await this.createFilmInDataBase(await this.parseFilm(id, api_key, driver));
    }

    async parseFilm(id, api_key, driver) {
        let filmUrl = `https://api.kinopoisk.dev/v1.3/movie/${id}`
        let fetchRes = await fetch(filmUrl,{
            method: 'GET',
            headers: {"content-type": "application/json; charset=UTF-8", 'X-API-Key': api_key}
        })
        const filmResp = await fetchRes.json();

        const film = this.parseFilmInfo(filmResp);

        const creators = this.parseCreators(filmResp);

        const genres = filmResp.genres;
        const countries = await this.parseCountries(filmResp)


        let relatedFilms = []

        for (let relatedFilm of filmResp.similarMovies) {
            relatedFilms.push(relatedFilm.name)
        }

        let awards = await this.getAwardsData(driver, `https://www.kinopoisk.ru/film/${filmResp.id}/`)

        return {
            film,
            creators,
            genres,
            countries,
            awards,
            relatedFilms
        }
    }

    parseFilmInfo(filmResp) {
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
        const name = filmResp.name;
        if (name) {
            film.name = name;
        }

        const originalName = filmResp.alternativeName;

        if (originalName) {
            film.originalName = originalName;
        } else {
            film.originalName = name;
        }

        const poster = filmResp.poster.url;
        if (poster) {
            film.poster = poster;
        }

        const trailer = filmResp.videos.trailers[0].url;
        if (trailer) {
            film.trailer = trailer;
        }

        const rating = Number(filmResp.rating.kp.toFixed(2));
        if (rating) {
            film.rating = rating;
        }

        const mpaaRating = filmResp.ageRating + "+";
        if (mpaaRating) {
            film.mpaaRating = mpaaRating;
        }

        const ratingsNumber = filmResp.votes.kp;
        if (ratingsNumber) {
            film.ratingsNumber = ratingsNumber;
        }

        const description = filmResp.description;
        if (description) {
            film.description = description;
        }

        const year = filmResp.year;
        if (year) {
            film.year = year;
        }
        const duration = filmResp.movieLength;
        if (duration) {
            film.duration = duration;
        }

        return film;
    }

    parseCreators(filmResp) {
        let directors = [];
        let writers = [];
        let actors = [];
        let producers = [];
        let cinematography = [];
        let musicians = [];
        let designers = [];
        let editors = [];
        const persons = filmResp.persons

        for (const person of persons) {
            let personDto = {
                name: "",
                originalName: "",
                photo: "",
                professions: []
            }

            const name = person.name
            const originalName = person.enName;

            person.name = name ? name : originalName;
            person.originalName = originalName ? originalName : name;

            const photo = person.photo;

            if (photo) {
                personDto.photo = person.photo;
            }

            if (person.profession == 'продюсеры') {
                personDto.professions.push('Продюсер');
                producers.push(personDto);
            }
            if (person.profession == 'режиссеры') {
                personDto.professions.push('Режиссер');
                directors.push(personDto);
            }
            if (person.profession == 'актеры') {
                personDto.professions.push('Актер');
                actors.push(personDto);
            }
            if (person.profession == 'операторы') {
                personDto.professions.push('Оператор');
                cinematography.push(personDto);
            }
            if (person.profession == 'редакторы') {
                personDto.professions.push('Сценарист');
                writers.push(personDto);
            }
            if (person.profession == 'художники') {
                personDto.professions.push('Художник');
                designers.push(personDto);
            }
            if (person.profession == 'монтажеры') {
                personDto.professions.push('Монтажер');
                editors.push(personDto);
            }
            if (person.profession == 'композиторы') {
                personDto.professions.push('Композитор');
                musicians.push(personDto);
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

    async parseCountries(filmResp) {
        let countries = filmResp.countries;

        for (let country of countries) {
            const { data } = await axios.get(
                'https://ru.wikipedia.org/wiki/Список_доменов_верхнего_уровня'
            );
            const $ = cheerio.load(data);

            country.englishName = $(`span:contains(${country.name})`).closest("tr").text().substring(2,4)
        }

        return countries
    }

    async getAwardsData(driver, link) {
        await driver.get(link);
        let awards = [];
        try {
            await driver.findElement(By.xpath(`//div[contains(@class, 'styles_awards__stpdy')]/a`)).click();
            const awardsElements = await driver.findElements(By.xpath(`//table//td//table[@class='js-rum-hero']//table[contains(@style, 'background')]`));
            for (let i = 1; i <= awardsElements.length; i++) {
                let award = {
                    name: '',
                    year: 0,
                    nominations: []
                }
                let name = await driver.wait(until.elementLocated(By.xpath(`//table//td//table[@class='js-rum-hero']//table[contains(@style, 'background')][${i}]//b`)), 20000);

                name = (await name.getText()).split(', ');
                award.name = name[0];
                award.year = Number(name[1].replace(' год', ''));

                const nominatoinsElements = await driver.findElements(By.xpath(`//a[contains(text(),'${name[0]}')]/parent::b/parent::td/parent::tr/parent::tbody//b[text()='Победитель']/ancestor::tr/following-sibling::tr[1]//ul//li`));

                if (nominatoinsElements.length > 0) {
                    for (let k = 1; k <= nominatoinsElements.length; k++) {
                        award.nominations.push({
                            name: await driver.findElement(By.xpath(`//a[contains(text(),'${name[0]}')]/parent::b/parent::td/parent::tr/parent::tbody//b[text()='Победитель']/ancestor::tr/following-sibling::tr[1]//ul//li[${k}]//a`)).getText()
                        })
                    }
                    awards.push(award);
                }
            }
        } catch (e) {

        } finally {
            await driver.quit();
        }
        return awards;
    }
}