import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {AwardNominations} from "./award_nominations.models";
import {Nomination} from "./nominations.model";


interface AwardCreationAttrs {
    name: string,
    year: number
}

@Table({tableName: 'awards'})
export class Award extends Model<Award, AwardCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, allowNull: false})
    name: string

    @Column({type: DataType.INTEGER, allowNull: false})
    year: number

    @BelongsToMany(() => Nomination, () => AwardNominations)
    nominations: Nomination[];
}