import {Column, DataType, Table, Model, BelongsToMany, HasMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "@app/common/models/roles_model/role.model";
import {Review} from "@app/common/models/review_models/reviews.model";
import {UserRoles} from "@app/common/models/users_model/user_roles.model";


interface UserCreationAttrs {
    email: string;
    password: string;
    first_name: string;
    second_name: string;
    phone: string;
    age: number;
    country: string;
    roles?: [string];
    reviews?: [string];
}

@Table({tableName: "users"})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: 1, description: "Уникальный идентификатор пользователя"})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;

    @ApiProperty({example: "bill@gmail.com", description: "Почтовый адрес пользователя"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: "t213fggf", description: "Пароль"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: "Иван", description: "Имя пользователя"})
    @Column({type: DataType.STRING, allowNull: false})
    first_name: string;

    @ApiProperty({example: "Иванов", description: "Фамилия пользователя"})
    @Column({type: DataType.STRING, allowNull: false})
    second_name: string;

    @ApiProperty({example: "89270000000", description: "Номер телефона пользователя"})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    phone: string;

    @ApiProperty({example: 18, description: "Возраст пользователя"})
    @Column({type: DataType.INTEGER, allowNull: true})
    age: number;

    @ApiProperty({example: "Россия", description: "Страна пользователя"})
    @Column({type: DataType.STRING, allowNull: true})
    country: string;

    @ApiProperty({example: [{}], description: "Список ролей пользователя"})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: [];

    @ApiProperty({example: [{}], description: "Список комментариев пользователя"})
    @Column({type: DataType.ARRAY(DataType.STRING), allowNull: false, defaultValue:[]})
    reviews: Review[];

    @ApiProperty({example: "fjioertherty843optjiskvjw8opru92fpj348t5up34tijerpt", description: "refreshToken"})
    @Column({type: DataType.STRING(1000), allowNull: true})
    refreshToken: string;
}