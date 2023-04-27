import {Inject, Injectable} from "@nestjs/common";
import {CreateFilmDto} from "@app/common";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {isNull} from "util";


@Injectable()
export class AppService {

    constructor(@Inject('FILM') private readonly filmService: ClientProxy) {
    }

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
        return ['Харви Вайнштейн', 'Александр Роднянский']
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
        return ['Татьяна Кальдерон', 'Лоик Реми']
    }

    getGenres() {
        return ['Комедия', 'Фантастика']
    }

    getCountries() {
        return [{name: 'США', englishName: 'us'}, {name: 'Россия', englishName: 'ru'}]
    }

    getAwards() {
        return [{name: 'Оскар', year: 2023, nominations: ['Лучший фильм']}]
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
            .forBrowser('chrome')
            .usingServer('http://chrome:4444/wd/hub')
            .build();
    }
    async parseOneFilm(id) {
        const {By, until} = require('selenium-webdriver');
        const driver = await this.createDriver();
        await driver.get(`https://www.kinopoisk.ru/film/${id}/`);
        let createFilmData = null;
        try {
            createFilmData = await this.getFilmData(driver, By, until);
        } catch (e) {
            console.log(e)
        }


        const createFilmDto = createFilmData.film;
        const directors = createFilmData.creators.directors;
        const writers = createFilmData.creators.writers;
        const producers = createFilmData.creators.producers;
        const cinematography = createFilmData.creators.cinematography;
        const musicians = createFilmData.creators.musicians;
        const designers = createFilmData.creators.designers;
        const editors = createFilmData.creators.editors;
        const genres = createFilmData.genres;
        const awards = createFilmData.awards;
        const countries = createFilmData.countries;
        const actors = createFilmData.actors;

        let createdFilm = lastValueFrom(this.filmService.send(
            {
                cmd: 'create-film',
            },
            {
                createFilmDto,
                directors,
                actors,
                writers,
                producers,
                cinematography,
                musicians,
                designers,
                editors,
                genres,
                countries,
                awards,
            })
        );

        await driver.quit();
    }
    async fillDataBase() {
        const {By, until} = require('selenium-webdriver');
        const driver = await this.createDriver();
        await driver.get('https://www.kinopoisk.ru/top/navigator/m_act[rating]/1%3A/order/num_vote/perpage/200/#results');
        for (let i = 10; i < 20; i++) {
            await driver.wait(until.elementLocated(By.xpath(`//div[@id='itemList']/div[${i}]//a[1]`)), 50000).click();
            let createFilmData = null

            try {
                createFilmData = await this.getFilmData(driver, By, until);
            } catch (e) {
                await driver.navigate().back()
                continue
            }

            const createFilmDto = createFilmData.film;
            const directors = createFilmData.creators.directors;
            const writers = createFilmData.creators.writers;
            const producers = createFilmData.creators.producers;
            const cinematography = createFilmData.creators.cinematography;
            const musicians = createFilmData.creators.musicians;
            const designers = createFilmData.creators.designers;
            const editors = createFilmData.creators.editors;
            const genres = createFilmData.genres;
            const awards = createFilmData.awards;
            const countries = createFilmData.countries;
            const actors = createFilmData.actors;

            let createdFilm = lastValueFrom(this.filmService.send(
                {
                    cmd: 'create-film',
                },
                {
                    createFilmDto,
                    directors,
                    actors,
                    writers,
                    producers,
                    cinematography,
                    musicians,
                    designers,
                    editors,
                    genres,
                    countries,
                    awards,
                })
            );
        }
        await driver.quit();
    }

    async getFilmData(driver, By, until) {

        let film: CreateFilmDto = {
            name: "",
            originalName: "",
            poster: "",
            mpaaRating: "",
            rating: 0,
            ratingsNumber: 0,
            year: 0,
            duration: "",
            description: ""
        };

        let name = await driver.wait(until.elementLocated(By.xpath(`//h1[@itemprop='name']/span`)), 20000);
        film.name = (await name.getText()).replace(/\(\d{4}\)/i, '');

        try {
            let originalName = await driver.wait(until.elementLocated(By.xpath(`//span[contains(@class, 'styles_originalTitle__JaNKM')]`)), 3000);
            film.originalName = (await originalName.getText()).replace(/\(\d{4}\)/i, '');
        } catch (e) {

        }

        let poster = await driver.wait(until.elementLocated(By.xpath(`//img[contains(@class, 'film-poster')]`)), 20000);
        film.poster = await poster.getAttribute('src');

        try {
            let mpaaRating = await driver.wait(until.elementLocated(By.xpath(`//span[@class='styles_ageRate__340KC']`)), 3000);
            film.mpaaRating = await mpaaRating.getText();
        } catch (e) {

        }

        let rating = await driver.wait(until.elementLocated(By.xpath(`//span[contains(@class, 'film-rating-value')]/span`), 20000));
        film.rating = Number(await rating.getText());


        let ratingsNumber = await driver.wait(until.elementLocated(By.xpath(`//span[@class='styles_count__iOIwD']`)), 20000);
        film.ratingsNumber = Number(((await ratingsNumber.getText()).replace(/оцен(ки)?(ка)?ок/i, '').replaceAll(' ', '')));

        let year = await driver.wait(until.elementLocated(By.xpath(`//div[contains(text(), 'Год производства')]/parent::div/div[2]`)), 20000);
        film.year = Number((await year.getText()).substring(0,4));

        let duration = await driver.wait(until.elementLocated(By.xpath(`//div[contains(text(), 'Время')]/parent::div/div[2]`)), 20000);
        film.duration = (await duration.getText()).replace(/\d+ мин. \/ /, '');
        let seasons = (await year.getText()).match(/\d сезон(а)?(ов)?/gi);

        if (seasons) {
            film.duration = seasons[0];
        }

        let description = await driver.wait(until.elementLocated(By.xpath(`//p[@class='styles_paragraph__wEGPz']`)), 20000);
        film.description = await description.getText();

        let creators = {
            directors: [],
            writers: [],
            producers: [],
            cinematography: [],
            musicians: [],
            designers: [],
            editors: [],
        }

        let i = 5;

        for (const key of Object.keys(creators)) {
            for (let k = 0; k < 3; k++) {
                const links = await driver.findElements(By.xpath(`//div[contains(@data-test-id, 'encyclopedic-table')]//div[${i}]//a`));
                let link = links[k];

                if (!link) {
                    break
                }

                link.click();
                creators[key].push(await this.getPersonData(driver, By, until));
            }
            i++;
        }

        let actors = [];
        const actorsElements = await driver.findElements(By.xpath(`//div[contains(@class, 'styles_actors__wn_C4')]//li/a`));

        for (let i = 1; i <= actorsElements.length; i++) {
            await driver.wait(until.elementLocated(By.xpath(`//div[contains(@class, 'styles_actors__wn_C4')]//li[${i}]/a`)), 50000).click();
            actors.push(await this.getPersonData(driver, By, until));
        }

        let countries = [];
        const countriesElements = await driver.findElements(By.xpath(`//div[contains(@class, 'styles_row__da_RK')][2]//a`));

        const axios = require('axios');
        const cheerio = require('cheerio');
        const { data } = await axios.get(
            'https://ru.wikipedia.org/wiki/Список_доменов_верхнего_уровня'
        );
        const $ = cheerio.load(data);

        for (const countriesElement of countriesElements) {
            let country = {
                name: "",
                englishName: ""
            }
            country.name = await countriesElement.getText();
            country.englishName = $(`span:contains(${country.name})`).closest("tr").text().substring(2,4);
            console.log(country)
            countries.push(country);
        }

        let genres = [];
        const genresElements = await driver.findElements(By.xpath(`//div[contains(@class, 'styles_row__da_RK')][3]//a[@data-tid='603f73a4']`));

        for (const genresElement of genresElements) {
            genres.push(await genresElement.getText())
        }

        let awards = [];

        try {
            awards = await this.getAwardsData(driver, By, until);
        } catch (e) {

        }

        await driver.navigate().back();

        return {
            film,
            creators,
            actors,
            genres,
            countries,
            awards
        }
    }

    async getPersonData(driver, By, until) {
        let person = {
            name: "",
            originalName: "",
            photo: "",
            professions: []
        };

        let name = await driver.wait(until.elementLocated(By.xpath(`//h1[contains(@class, 'styles_primaryName__2Zu1T')]`)), 20000);

        try {
            let originalName = await driver.wait(until.elementLocated(By.xpath(`//div[contains(@class, 'styles_secondaryName__MpB48')]`)), 3000);
            person.originalName = await originalName.getText();
        } catch (e) {

        }

        let photo = await driver.wait(until.elementLocated(By.xpath(`//img[contains(@class, 'styles_image__lSxoD')]`)), 20000);

        person.name = await name.getText();

        person.photo = await photo.getAttribute('src');
        let professions = await driver.findElements(By.xpath(`//div[contains(text(), 'Карьера')]/parent::div/div[contains(@class, 'styles_value__g6yP4')]//button`));

        for (const profession of professions) {
            person.professions.push(await profession.getText())
        }

        await driver.navigate().back()

        return person;
    }

    async getAwardsData(driver, By, until) {
        await driver.findElement(By.xpath(`//div[contains(@class, 'styles_awards__stpdy')]/a`)).click();
        console.log('awards1')
        let awards = [];

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
        console.log('awards2')

        await driver.navigate().back();

        return awards;
    }
}