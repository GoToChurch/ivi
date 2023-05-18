import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Award} from "./awards.model";
import {Nomination} from "./nominations.model";


@Table({tableName: "award_nominations"})
export class AwardNominations extends Model<AwardNominations> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @ForeignKey(() => Award)
    @Column({type: DataType.INTEGER})
    awardId: number

    @ForeignKey(() => Nomination)
    @Column({type: DataType.INTEGER})
    nominationId: number
}