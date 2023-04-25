import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {FilmDirectors} from "./film_directors.models";
import {Person} from "../../persons_models/persons.model";
import {FilmActors} from "./film_actors.model";
import {FilmWriters} from "./film_writers.model";
import {FilmProducers} from "./film_producers.model";
import {FilmCinematography} from "./film_cinematography.model";
import {FilmMusicians} from "./film_musicians.model";
import {FilmDesigners} from "./film_designers.model";
import {FilmEditors} from "./film_editors.model";
import {Genre} from "../../genre_models/genre.model";
import {FilmGenres} from "../../genre_models/film_genres.model";
import {Award} from "../../award_models/awards.model";
import {FilmAwards} from "../../award_models/film_awards.model";
import {Review} from "../reviews/reviews.model";
import {Country} from "../../country_models/country.model";
import {FilmCountries} from "../../country_models/film_country.model";
import {RelatedFilms} from "./related_films.model";


interface FilmCreationAttrs {
    name: string,
    poster: string,
    mpaaRating: string,
    rating: number,
    ratingsNumber: number,
    year: number,
    duration: string,
    description: string,
}

@Table({tableName: 'films'})
export class Film extends Model<Film, FilmCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING})
    poster: string

    @Column({type: DataType.STRING})
    mpaaRating: string

    @Column({type: DataType.DECIMAL(2, 1)})
    rating: number

    @Column({type: DataType.INTEGER, defaultValue: 0})
    ratingsNumber: number

    @Column({type: DataType.INTEGER, allowNull: false})
    year: number

    @Column({type: DataType.STRING, allowNull: false})
    duration: string

    @Column({type: DataType.TEXT})
    description: string

    @BelongsToMany(() => Person, () => FilmDirectors)
    directors: Person[];

    @BelongsToMany(() => Person, () => FilmActors)
    actors: Person[];

    @BelongsToMany(() => Person, () => FilmWriters)
    writers: Person[];

    @BelongsToMany(() => Person, () => FilmProducers)
    producers: Person[];

    @BelongsToMany(() => Person, () => FilmCinematography)
    cinematography: Person[];

    @BelongsToMany(() => Person, () => FilmMusicians)
    musicians: Person[];

    @BelongsToMany(() => Person, () => FilmDesigners)
    designers: Person[];

    @BelongsToMany(() => Person, () => FilmEditors)
    editors: Person[];

    @BelongsToMany(() => Genre, () => FilmGenres)
    genres: Genre[];

    @BelongsToMany(() => Award, () => FilmAwards)
    awards: Award[];

    @BelongsToMany(() => Country, () => FilmCountries)
    countries: Award[];

    @HasMany(() => Review)
    reviews: Review[];

    @BelongsToMany(() => Film, () => RelatedFilms)
    relatedFilms: Film[];
}