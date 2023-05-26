import {Column, DataType, Model, Table} from "sequelize-typescript";


@Table({tableName: "related_films"})
export class RelatedFilms extends Model<RelatedFilms> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER})
    filmId: number

    @Column({type: DataType.INTEGER})
    relatedFilmId: number
}