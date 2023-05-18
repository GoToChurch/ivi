import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Person} from "./persons.model";
import {PersonProfessions} from "./person_professions.model";
import {ApiProperty} from "@nestjs/swagger";


interface ProfessionCreationAttrs {
    name: string,
}

@Table({tableName: "professions"})
export class Profession extends Model<Profession, ProfessionCreationAttrs> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ApiProperty({example: "Режиссер", description: "Название профессии"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @ApiProperty({example: [{}], description: "Список персон профессии"})
    @BelongsToMany(() => Person, () => PersonProfessions)
    persons: Person[];
}