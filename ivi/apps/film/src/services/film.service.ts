import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "../models/films_models/films/films.model";
import {CreateFilmDto} from "../dto/create_film.dto";
import {Op} from "sequelize";
import {PersonService} from "./person.service";
import {GenreService} from "./genre.service";
import {Profession} from "../models/persons_models/professions.model";
import {CountryService} from "./country.service";
import {countriesMap, genresMap} from "@app/common/maps/maps";
import {AwardService} from "./award.service";


@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private filmRepository: typeof Film,
              private personService: PersonService,
              private genreService: GenreService,
              private countryService: CountryService,
              private awardService: AwardService) {}

  async createFilm(dto: CreateFilmDto, directors, actors, writers, producers, cinematography, musicians, designers,
                   editors, genres, countries, awards, nominations) {
    const film = await this.filmRepository.create(dto);

    await this.addDirectorsForFilm(film, directors);
    await this.addActorsForFilm(film, actors);
    await this.addWritersForFilm(film, writers);
    await this.addProducersForFilm(film, producers);
    await this.addDesignersForFilm(film, designers);
    await this.addCinematographyForFilm(film, cinematography);
    await this.addMusiciansForFilm(film, musicians);
    await this.addEditorsForFilm(film, editors);
    await this.addGenresForFilm(film, genres);
    await this.addCountriesForFilm(film, countries);
    await this.addAwardsForFilm(film, awards, nominations);

    return film;
  }

  async getAllFilms(query) {
    let films = await this.filmRepository.findAll({
      include: {
        all: true
      }
    });

    films = this.handleQuery(films, query)

    return films;
  }

  async getFilmById(id: number) {
    return await this.filmRepository.findByPk(id, {
      include: {
        all: true
      }
    });
  }

  async filterFilms(genreFilter, yearFilter, countriesFilter, query) {
    let films: Film[] = await this.getAllFilms(query);

    if (genreFilter) {
      films = await this.filterFilmsByGenres(films, genreFilter);
    }
    if (yearFilter) {
      if (yearFilter.includes('-')) {
        films = this.filterFilmsByYearInterval(films, yearFilter);
      } else {
        films = this.filterFilmsBySingleYear(films, yearFilter)
      }
    }
    if (countriesFilter) {
      films = await this.filterFilmsByCountries(films, countriesFilter);
    }

    return films;

  }

  async filterFilmsByCountries(films, countries) {
    let filmsIds =  await this.countryService.getFilmsIdsByCountries(countries);
    return films.filter(film => filmsIds.includes(film.id))
  }

  async filterFilmsByGenres(films: Film[], genres) {
    let filmsIds =  await this.genreService.getFilmsIdsByGenres(genres);
    return films.filter(film => filmsIds.includes(film.id))
  }

  filterFilmsBySingleYear(films, year: number) {
    return films.filter(film => film.year == year);
  }

  filterFilmsByYearInterval(films, interval: string) {
    const [firstYear, secondYear] = interval.split('-');
    return films.filter(film => film.year >= +firstYear && film.year <= +secondYear);
  }

  filterFilmsByRating(films, query) {
      return films.filter(film => film.rating >= query.rating_gte)
  }

  filterFilmsByRatingNumber(films, query) {
      return films.filter(film => film.ratingsNumber >= query.ratingsNumber_gte)
  }

  async getFilmsByDirector(director: string) {
    return await this.personService.getAllPersonsFilms(director);
  }

  async getFilmsByActor(actor: string) {
    return await this.personService.getAllPersonsFilms(actor);
  }

  async editFilm(name: string, id: number) {
    await this.filmRepository.update({name: name}, {
      where: {
        id
      }
    })

    return this.getFilmById(id);
  }

  async deleteFilm(id: number) {
    await this.filmRepository.destroy({
      where: {
        id
      }
    })
  }

  async addDirectorsForFilm(film: Film, directors) {
    const profession = await this.personService.getOrCreateProfession("Режиссер");

    await film.$set('directors', []);

    await this.addInfoForPesronAndFilm(film, directors, profession, 'director')
  }

  async addActorsForFilm(film: Film, actors) {
    const profession = await this.personService.getOrCreateProfession("Актер");

    await film.$set('actors', []);

    await this.addInfoForPesronAndFilm(film, actors, profession, 'actor')
  }

  async addWritersForFilm(film: Film, writers) {
    const profession = await this.personService.getOrCreateProfession("Сценарист");


    await film.$set('writers', []);

    await this.addInfoForPesronAndFilm(film, writers, profession, 'writer')
  }

  async addProducersForFilm(film: Film, producers) {
    const profession = await this.personService.getOrCreateProfession("Продюссер");
    await film.$set('producers', []);

    await this.addInfoForPesronAndFilm(film, producers, profession, 'producer')
  }

  async addCinematographyForFilm(film: Film, cinematography) {
    const profession = await this.personService.getOrCreateProfession("Оператор");
    await film.$set('cinematography', []);

    await this.addInfoForPesronAndFilm(film, cinematography, profession, 'cinematography')
  }

  async addMusiciansForFilm(film: Film, musicians) {
    const profession = await this.personService.getOrCreateProfession("Композитор");
    await film.$set('musicians', []);

    await this.addInfoForPesronAndFilm(film, musicians, profession, 'musician')
  }

  async addDesignersForFilm(film: Film, designers) {
    const profession = await this.personService.getOrCreateProfession("Художник");
    await film.$set('designers', []);

    await this.addInfoForPesronAndFilm(film, designers, profession, 'designer')
  }

  async addEditorsForFilm(film: Film, editors) {
    const profession = await this.personService.getOrCreateProfession("Режиссер монтажа");
    await film.$set('editors', []);

    await this.addInfoForPesronAndFilm(film, editors, profession, 'editor')
  }

  async addGenresForFilm(film: Film, genres) {
    await film.$set('genres', []);

    for (const genreName of genres) {
      let genre = await this.genreService.getGenreByName(genreName);
      console.log(genreName);
      if (!genre) {
        genre = await this.genreService.createGenre({name: genreName, englishName: genresMap.get(genreName)});
      }
      // await this.genreService.addFilmsForGenre(film, genre);
      await film.$add('genre', genre.id);
    }
  }

  async addCountriesForFilm(film: Film, countries) {
    await film.$set('countries', []);

    for (const countryName of countries) {
      let country = await this.countryService.getCountryByName(countryName);

      if (!country) {
        country = await this.countryService.createCountry({name: countryName, englishName: countriesMap.get(countryName)});
      }

      await this.countryService.addFilmsForCountry(film, country);
      await film.$add('genre', country.id);
    }
  }

  async addAwardsForFilm(film: Film, awards, nominations) {
    await film.$set('awards', []);

    for (const awardDto of awards) {
      let award = await this.awardService.getOrCreateAward(awardDto);

      await film.$add('award', award.id);
      await this.awardService.addFilmAndNominationsForAward(film, award, nominations);
    }
  }

  async addInfoForPesronAndFilm(film: Film, persons, profession: Profession, professionName) {
    for (const personName of persons) {
      let person = await this.personService.getOrCreatePerson({name: personName, photo: "aa"});

      await this.personService.addFilmForPerson(person, film);
      await this.personService.addProfessionForPerson(person, profession);


      await film.$add(professionName, person.id)

      await this.personService.addProfessionInFilmForPerson(film, person, profession)
    }
  }

  handleQuery(films, query) {
    let filteredFilms: Film[] = films;

    if (query.rating_gte) {
      filteredFilms = this.filterFilmsByRating(films, query);
    }
    if (query.ratingsNumber_gte) {
      filteredFilms = this.filterFilmsByRatingNumber(films, query);
    }

    return filteredFilms;
  }
}
