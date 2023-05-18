import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Film} from "../films_models/films/films.model";
import {Profession} from "./professions.model";
import {PersonProfessions} from "./person_professions.model";
import {PersonFilms} from "./person_films.model";
import {ApiProperty} from "@nestjs/swagger";


interface PersonCreationAttrs {
    name: string,
    photo: string,
    englishName: string
}

@Table({tableName: "persons"})
export class Person extends Model<Person, PersonCreationAttrs> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор персоны"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Омар Си", description: "Полное имя персоны"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: "Omar cy", description: "Полное имя персоны на оригальном языке"})
    @Column({type: DataType.STRING, allowNull: false})
    originalName: string

    @ApiProperty({example: "http://example.com/photo", description: "Ссылка на фото персоны"})
    @Column({type: DataType.STRING})
    photo: string

    @ApiProperty({example: [{}], description: "Список фильмов персоны"})
    @BelongsToMany(() => Film, {
        through: {
            model: () => PersonFilms,
            unique: false
        },
    })
    films: Film[];

    @ApiProperty({example: [{}], description: "Список профессий персоны"})
    @BelongsToMany(() => Profession, () => PersonProfessions)
    professions: Profession[];
}