import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {AwardNominations} from "./award_nominations.model";
import {Nomination} from "./nominations.model";
import {ApiProperty} from "@nestjs/swagger";


interface AwardCreationAttrs {
    name: string,
    year: number
}

@Table({tableName: "awards"})
export class Award extends Model<Award, AwardCreationAttrs> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор награды"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Оскар", description: "Название награды"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: 2023, description: "Год вручения награды"})
    @Column({type: DataType.INTEGER, allowNull: false})
    year: number

    @ApiProperty({example: [{}], description: "Cписок номинаций наград"})
    @BelongsToMany(() => Nomination, () => AwardNominations)
    nominations: Nomination[];
}