import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "../films/films.model";
import {User} from "@app/common/models/users_model/user.model";


interface ReviewCreationAttrs {
    title: string,
    text: string,
}

@Table({tableName: 'reviews'})
export class Review extends Model<Review, ReviewCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING})
    title: string

    @Column({type: DataType.TEXT, allowNull: false})
    text: string

    @Column({type: DataType.INTEGER, defaultValue: 36})
    rating: number

    @BelongsTo(() => User)
    user: string

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number;

    @BelongsTo(() => Film)
    film: string

    @ForeignKey(() => Review)
    @Column({type: DataType.INTEGER})
    parentId: number;

    @BelongsTo(() => Review, 'parentId')
    parent: string
}