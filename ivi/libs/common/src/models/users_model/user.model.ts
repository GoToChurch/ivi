import {Column, DataType, Table, Model, BelongsToMany, HasMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Profession} from "@app/common/models/persons_models/professions.model";
import {PersonProfessions} from "@app/common/models/persons_models/person_professions.model";
import {Role} from "@app/common/models/roles_model/role.model";
import {Review} from "@app/common/models/films_models/reviews/reviews.model";
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

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {

    @ApiProperty({example: '1', description: 'Уникальный ключ'})
    @Column({type: DataType.INTEGER, autoIncrement: true, primaryKey: true, unique: true})
    id: number;

    @ApiProperty({example: 'bill@gmail.com', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: 't213fggf', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'Иван', description: 'Имя'})
    @Column({type: DataType.STRING, allowNull: false})
    first_name: string;

    @ApiProperty({example: 'Иванов', description: 'Фамилия'})
    @Column({type: DataType.STRING, allowNull: false})
    second_name: string;

    @ApiProperty({example: '89270000000', description: 'Номер телефона'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    phone: string;

    @ApiProperty({example: '18', description: 'Возраст'})
    @Column({type: DataType.INTEGER, allowNull: true})
    age: number;

    @ApiProperty({example: 'Россия', description: 'Страна'})
    @Column({type: DataType.STRING, allowNull: true})
    country: string;

    @ApiProperty({example: [{}], description: 'Список ролей пользователя'})
    @BelongsToMany(() => Role, () => UserRoles)
    roles: [];

    @ApiProperty({example: [{}], description: 'Список комментариев пользователя'})
    @HasMany(() => Review)
    reviews: [];
}