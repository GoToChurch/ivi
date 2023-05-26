import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "../films_models/films/films.model";
import {Profession} from "./professions.model";
import {Person} from "./persons.model";


@Table({tableName: "person_films"})
export class PersonFilms extends Model<PersonFilms> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number

    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER, unique: false})
    personId: number

    @ForeignKey(() => Profession)
    @Column({type: DataType.INTEGER})
    professionId: number
}