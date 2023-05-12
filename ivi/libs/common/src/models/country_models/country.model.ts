import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Film} from "../films_models/films/films.model";
import {FilmCountries} from "./film_country.model";
import {ApiProperty} from "@nestjs/swagger";


interface GenreCreationAttrs {
    name: string,
    englishName: string,
}

@Table({tableName: 'countries'})
export class Country extends Model<Country, GenreCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING, allowNull: false})
    englishName: string

    @BelongsToMany(() => Film, () => FilmCountries)
    films: Film[];
}