import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "../models/films_models/films/films.model";
import {CreateFilmDto} from "../dto/create_film.dto";
import {Op} from "sequelize";
import {PersonService} from "./person.service";
import {GenreService} from "./genre.service";
import {Profession} from "../models/persons_models/professions.model";
import {CountryService} from "./country.service";
import {countriesMap, genresMap} from "../../../api_gateway/src/maps/maps";


@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private filmRepository: typeof Film,
              private personService: PersonService,
              private genreService: GenreService,
              private countryService: CountryService) {}

  async createFilm(dto: CreateFilmDto, directors, actors, writers, producers, cinematography, musicians, designers,
                   editors, genres, countries) {
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

    return film;
  }

  async getAllFilms() {
    return await this.filmRepository.findAll({
      include: {
        all: true
      }
    });
  }

  async getFilmById(id: number) {
    return await this.filmRepository.findByPk(id);
  }

  async filterFilms(genreFilter, yearFilter, countriesFilter) {
    let films: Film[] = await this.getAllFilms();

    if (genreFilter) {
      films = await this.filterFilmsByGenres(films, genreFilter);
    }
    if (yearFilter) {
      if (yearFilter.includes('-')) {
        films = await this.filterFilmsByYearInterval(films, yearFilter);
      } else {
        films = await this.filterFilmsBySingleYear(films, yearFilter)
      }
    }
    if (countriesFilter) {
      films = await this.filterFilmsByCountries(films, countriesFilter);
    }

    return films;

  }

  // async getFilmsByGenresAndYear(genresFilter, yearFilter) {
  //   if (yearFilter.includes('-')) {
  //     const [firstYear, secondYear] = yearFilter.split('-');
  //
  //
  //     return await this.filmRepository.findAll({
  //       where: {
  //         genres: {
  //         },
  //         year: {
  //           [Op.between]: [+firstYear, +secondYear]
  //         }
  //       }
  //     })
  //   }
  //
  //   return await this.filmRepository.findAll({
  //     where: {
  //       genres: {
  //
  //       },
  //       year: +yearFilter
  //     }
  //   })
  // }
  //
  // async getFilmsByGenresAndYearAndCountries(genresFilter, yearFilter, countryFilter) {
  //   if (yearFilter.includes('-')) {
  //     const [firstYear, secondYear] = yearFilter.split('-');
  //
  //     return await this.filmRepository.findAll({
  //       where: {
  //         genres: {
  //           [Op.in]: genresFilter
  //         },
  //         year: {
  //           [Op.between]: [+firstYear, +secondYear]
  //         },
  //         countries: {
  //           [Op.in]: countryFilter
  //         }
  //       }
  //     })
  //   }
  //
  //   return await this.filmRepository.findAll({
  //     where: {
  //       genres: {
  //         [Op.in]: genresFilter
  //       },
  //       year: +yearFilter,
  //       countries: {
  //         [Op.in]: countryFilter
  //       }
  //     }
  //   })
  // }

  async filterFilmsByCountries(films, countries) {
    let filmsIds =  await this.countryService.getFilmsIdsByCountries(countries);
    return films.filter(film => filmsIds.includes(film.id))
  }

  async filterFilmsByGenres(films: Film[], genres) {
    let filmsIds =  await this.genreService.getFilmsIdsByGenres(genres);
    return films.filter(film => filmsIds.includes(film.id))
  }

  async filterFilmsBySingleYear(films, year: number) {
    return films.filter(film => film.year == year);
  }

  async filterFilmsByYearInterval(films, interval: string) {
    const [firstYear, secondYear] = interval.split('-');
    return films.filter(film => film.year >= +firstYear && film.year <= +secondYear);
  }

  async getFilmsWithHigherRating(rating: number) {
    return await this.filmRepository.findAll({
      where: {
        rating: {
          [Op.gte]: rating,
        }
      }
    })
  }

  async getFilmsWithHigherRatingsNumber(ratingsNumber: number) {
    return await this.filmRepository.findAll({
      where: {
        ratingsNumber: {
          [Op.gte]: ratingsNumber,
        }
      }
    })
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

  async addInfoForPesronAndFilm(film: Film, persons, profession: Profession, professionName) {
    for (const personName of persons) {
      let person = await this.personService.getPersonByName(personName);

      if (!person) {
        person = await this.personService.createPerson({name: personName, photo: "aa"});
      }

      await this.personService.addFilmForPerson(person, film);
      await this.personService.addProfessionForPerson(person, profession);


      await film.$add(professionName, person.id)

      await this.personService.addProfessionInFilmForPerson(film, person, profession)
    }
  }
}
