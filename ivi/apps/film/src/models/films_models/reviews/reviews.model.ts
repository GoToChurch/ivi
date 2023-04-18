import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "../films/films.model";



interface ReviewCreationAttrs {
    title: string,
    text: string,
    filmId: number,
}

@Table({tableName: 'reviews'})
export class Review extends Model<Review, ReviewCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER})
    title: string

    @Column({type: DataType.TEXT})
    text: string

    @Column({type: DataType.INTEGER, defaultValue: 36})
    rating: number

    // @BelongsTo(() => User)
    // user: string

    // @ForeignKey(() => User)
    // @Column({type: DataType.INTEGER})
    // userId: number;

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number;

    @BelongsTo(() => Film)
    film: string
}