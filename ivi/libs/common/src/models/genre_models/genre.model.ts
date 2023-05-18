import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Film} from "../films_models/films/films.model";
import {FilmGenres} from "./film_genres.model";
import {ApiProperty} from "@nestjs/swagger";


interface GenreCreationAttrs {
    name: string,
    englishName: string,
}

@Table({tableName: "genres"})
export class Genre extends Model<Genre, GenreCreationAttrs> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор жанра"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Драма", description: "Название жанра"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: "drama", description: "Название жанра на английском языке"})
    @Column({type: DataType.STRING, allowNull: false})
    englishName: string

    @ApiProperty({example: [{}], description: "Список фильмов в жанре"})
    @BelongsToMany(() => Film, () => FilmGenres)
    films: Film[];
}