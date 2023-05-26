import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";


interface NominationCreationAttrs {
    name: string
}

@Table({tableName: "nominations"})
export class Nomination extends Model<Nomination, NominationCreationAttrs> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор номинации"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Оскар", description: "Название номинации"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string
}