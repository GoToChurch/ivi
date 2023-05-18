import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "./films.model";
import {Person} from "../../persons_models/persons.model";


@Table({tableName: "film_editors"})
export class FilmEditors extends Model<FilmEditors> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number

    @ForeignKey(() => Person)
    @Column({type: DataType.INTEGER})
    personId: number
}