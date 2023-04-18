import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Person} from "./persons.model";
import {PersonProfessions} from "./person_professions.model";


interface ProfessionCreationAttrs {
    name: string,
}

@Table({tableName: 'professions'})
export class Profession extends Model<Profession, ProfessionCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @BelongsToMany(() => Person, () => PersonProfessions)
    persons: Person[];
}