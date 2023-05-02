import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "@app/common";



@Table({tableName: 'related_films'})
export class RelatedFilms extends Model<RelatedFilms> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    relatedFilmId: number
}