import {Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";

import {Profession, Film, CreateFilmDto, Country, Award} from "@app/common";
import {countriesMap, genresMap} from "@app/common/maps/maps";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";


@Injectable()
export class FilmService {
  constructor(@InjectModel(Film) private filmRepository: typeof Film,
              @Inject('PERSON') private readonly personService: ClientProxy,
              @Inject('GENRE') private readonly genreService: ClientProxy,
              @Inject('AWARD') private readonly awardService: ClientProxy,
              @Inject('COUNTRY') private readonly countryService: ClientProxy,) {}

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
    let filmsIds =  await lastValueFrom(this.countryService.send({
              cmd: 'get-or-create-country',
            },
            {
              countries
            })
    );
    return films.filter(film => filmsIds.includes(film.id))
  }

  async filterFilmsByGenres(films: Film[], genres) {
    let filmsIds =  await lastValueFrom(this.genreService.send({
      cmd: 'get-films-ids-by-genres'
    },
        {
          genres
        })
    );
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

  async getFilmsByPerson(name: string) {
    return await lastValueFrom(this.personService.send({
      cmd: 'get-all-films-by-person'
    }, {
      name
    })
    )
  }

  // async getFilmsByActor(actor: string) {
  //   return await this.personService.getAllPersonsFilms(actor);
  // }

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
    const profession = await lastValueFrom(this.personService.send({
      cmd: 'get-or-create-profession'
    },
        {
          profession: "Режиссер"
        })
    );

    await film.$set('directors', []);

    await this.addInfoForPesronAndFilm(film, directors, profession, 'director')
  }

  async addActorsForFilm(film: Film, actors) {
    const profession = await lastValueFrom(this.personService.send({
              cmd: 'get-or-create-profession'
            },
            {
              profession: "Актер"
            })
    );

    await film.$set('actors', []);

    await this.addInfoForPesronAndFilm(film, actors, profession, 'actor')
  }

  async addWritersForFilm(film: Film, writers) {
    const profession = await lastValueFrom(this.personService.send({
              cmd: 'get-or-create-profession'
            },
            {
              profession: "Сценарист"
            })
    );

    await film.$set('writers', []);

    await this.addInfoForPesronAndFilm(film, writers, profession, 'writer')
  }

  async addProducersForFilm(film: Film, producers) {
    const profession = await lastValueFrom(this.personService.send({
              cmd: 'get-or-create-profession'
            },
            {
              profession: "Продюссер"
            })
    );

    await film.$set('producers', []);

    await this.addInfoForPesronAndFilm(film, producers, profession, 'producer')
  }

  async addCinematographyForFilm(film: Film, cinematography) {
    const profession = await lastValueFrom(this.personService.send({
              cmd: 'get-or-create-profession'
            },
            {
              profession: "Оператор"
            })
    );

    await film.$set('cinematography', []);

    await this.addInfoForPesronAndFilm(film, cinematography, profession, 'cinematography')
  }

  async addMusiciansForFilm(film: Film, musicians) {
    const profession = await lastValueFrom(this.personService.send({
              cmd: 'get-or-create-profession'
            },
            {
              profession: "Композитор"
            })
    );

    await film.$set('musicians', []);

    await this.addInfoForPesronAndFilm(film, musicians, profession, 'musician')
  }

  async addDesignersForFilm(film: Film, designers) {
    const profession = await lastValueFrom(this.personService.send({
              cmd: 'get-or-create-profession'
            },
            {
              profession: "Художник"
            })
    );

    await film.$set('designers', []);

    await this.addInfoForPesronAndFilm(film, designers, profession, 'designer')
  }

  async addEditorsForFilm(film: Film, editors) {
    const profession = await lastValueFrom(this.personService.send({
              cmd: 'get-or-create-profession'
            },
            {
              profession: "Режиссер монтажа"
            })
    );

    await film.$set('editors', []);

    await this.addInfoForPesronAndFilm(film, editors, profession, 'editor')
  }

  async addGenresForFilm(film: Film, genres) {
    await film.$set('genres', []);

    for (const genreName of genres) {
      const genre = await lastValueFrom(this.genreService.send({
                cmd: 'get-or-create-genre'
              },
              {
                dto: {
                  name: genreName,
                  englishName: genresMap.get(genreName)
                }
              })
      );

      await film.$add('genre', genre.id);
    }
  }

  async addCountriesForFilm(film: Film, countries) {
    await film.$set('countries', []);

    for (const countryName of countries) {
      const dto = {name: countryName, englishName: countriesMap.get(countryName)};

      const country = await lastValueFrom(this.countryService.send<Country>({
        cmd: 'get-or-create-country',
      },
          {
            dto
          })
      );

      await film.$add('country', country.id);
    }
  }

  async addAwardsForFilm(film: Film, awards, nominations) {
    await film.$set('awards', []);

    for (const awardDto of awards) {

      let award = await lastValueFrom(this.awardService.send({
            cmd: 'get-or-create-award'
              },
          {
            awardDto
          })
      );
      await film.$add('award', award.id);

      let res = await lastValueFrom(this.awardService.send({
        cmd: 'add-film-and-nominations-for-award'
          },
              {
                film,
                award,
                nominations
              })
      );
    }
  }

  async addInfoForPesronAndFilm(film: Film, persons, profession: Profession, professionName) {
    for (const personName of persons) {
      const person = await lastValueFrom(this.personService.send({
                cmd: 'get-or-create-person'
              },
              {
                dto: {
                  name: personName,
                  photo: "aa"
                }
              })
      );

      let res = await lastValueFrom(this.personService.send({
        cmd: 'add-film-for-person'
      },
          {
            person,
            film
          })
      );

      await film.$add(professionName, person.id);

      res = await lastValueFrom(this.personService.send({
                cmd: 'add-profession-in-film-for-person'
              },
              {
                film,
                person,
                profession
              })
      );
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
