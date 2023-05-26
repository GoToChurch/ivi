import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Country} from "./country.model";
import {Film} from "../films_models/films/films.model";


@Table({tableName: "film_countries"})
export class FilmCountries extends Model<FilmCountries> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number

    @ForeignKey(() => Country)
    @Column({type: DataType.INTEGER})
    countryId: number
}