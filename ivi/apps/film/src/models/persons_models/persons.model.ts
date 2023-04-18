import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Film} from "../films_models/films/films.model";
import {Profession} from "./professions.model";
import {PersonProfessions} from "./person_professions.model";
import {PersonFilms} from "./person_films.model";


interface PersonCreationAttrs {
    name: string,
    photo: string
}

@Table({tableName: 'persons'})
export class Person extends Model<Person, PersonCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.STRING})
    photo: string

    @BelongsToMany(() => Film, () => PersonFilms)
    films: Film[];

    @BelongsToMany(() => Profession, () => PersonProfessions)
    professions: Profession[];
}