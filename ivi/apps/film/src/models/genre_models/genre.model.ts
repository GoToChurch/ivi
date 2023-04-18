import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Film} from "../films_models/films/films.model";
import {FilmGenres} from "./film_genres.model";



interface GenreCreationAttrs {
    name: string,
}

@Table({tableName: 'genres'})
export class Genre extends Model<Genre, GenreCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @BelongsToMany(() => Film, () => FilmGenres)
    films: Film[];
}