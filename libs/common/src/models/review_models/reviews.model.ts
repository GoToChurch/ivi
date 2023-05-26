import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Film} from "../films_models/films/films.model";
import {ApiProperty} from "@nestjs/swagger";


interface ReviewCreationAttrs {
    title: string,
    text: string,
}

@Table({tableName: "reviews"})
export class Review extends Model<Review, ReviewCreationAttrs> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор комментария"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Топ коммент", description: "Заголовок комментария"})
    @Column({type: DataType.STRING})
    title: string

    @ApiProperty({example: "Мне понравился фильм.", description: "Текст комментария"})
    @Column({type: DataType.TEXT, allowNull: false})
    text: string

    @ApiProperty({example: 36, description: "Рейтинг комментария"})
    @Column({type: DataType.INTEGER, defaultValue: 36})
    rating: number

    @ApiProperty({example: 1, description: "id владельца комментария"})
    @Column({type: DataType.INTEGER})
    userId: number;

    @ApiProperty({example: 1, description: "id фильма, к которому оставлен комментарий"})
    @ForeignKey(() => Film)
    @Column({type: DataType.INTEGER})
    filmId: number;

    @BelongsTo(() => Film)
    film: string

    @ApiProperty({example: 1, description: "id родительского комментария"})
    @ForeignKey(() => Review)
    @Column({type: DataType.INTEGER, onDelete: "CASCADE"})
    parentId: number;

    @BelongsTo(() => Review, "parentId")
    parent: string
}