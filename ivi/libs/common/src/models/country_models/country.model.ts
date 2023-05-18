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
    @ApiProperty({example: 1, description: "Уникальный идентификатор страны"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Франция", description: "Название страны"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: "fr", description: "Название страны на английском языке"})
    @Column({type: DataType.STRING, allowNull: false})
    englishName: string

    @ApiProperty({example: [{}], description: "Список фильмов, снятых в стране"})
    @BelongsToMany(() => Film, () => FilmCountries)
    films: Film[];
}