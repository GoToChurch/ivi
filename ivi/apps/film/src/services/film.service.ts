import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Film} from "../models/films_models/films/films.model";
import {CreateFilmDto} from "../dto/create_film.dto";
import {Op} from "sequelize";
import {PersonService} from "./person.service";
import {GenreService} from "./genre.service";
import {Person} from "../models/persons_models/persons.model";


@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private filmRepository: typeof Film,
              private personService: PersonService,
              private genreService: GenreService) {}

  async createFilm(dto: CreateFilmDto, directors) {
    const film = await this.filmRepository.create(dto);

    this.addDirectorsForFilm(film, directors);

    return film;
  }

  async getAllFilms() {
    return await this.filmRepository.findAll();
  }

  async getFilmById(id: number) {
    return await this.filmRepository.findByPk(id);
  }

  async

  async getFilmsByCountries(countries) {
    if (!countries) {
      return await this.getAllFilms();
    }

    return await this.filmRepository.findAll({
      where: {
        country: {
          [Op.in]: countries
        },
      }
    })
  }

  async getFilmsByGenres(genres) {
    if (!genres) {
      return await this.getAllFilms();
    }

    return await this.genreService.getFilmsByGenres(genres);
  }

  async getFilmsBySingleYear(year: number) {
    return await this.filmRepository.findAll({
      where: {
        year
      }
    })
  }

  async getFilmsByYearInterval(interval: string) {
    const [firstYear, secondYear] = interval.split('-');

    return await this.filmRepository.findAll({
      where: {
        year: {
          [Op.between]: [firstYear, secondYear]
        }
      }
    })
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
    const profession = await this.personService.getProfessionByName("Режиссер");
    await film.$set('directors', []);

    for (const director of directors) {
      let person = await this.personService.getPersonByName(director);

      if (!person) {
        person = await this.personService.createPerson({name: director, photo: "aa"});
      }

      this.personService.addFilmForPerson(person, film);
      this.personService.addProfessionForPerson(person, profession);
      await film.$add('director', person.id)
    }

  }
}
