import {IsNumber, IsString, Length, Min} from "class-validator";
import {IsEmail} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class RegistrationDto {
    @ApiProperty({example: "bill@gmail.com", description: "Почтовый адрес"})
    @IsString({message: "Должна быть строка"})
    @IsEmail({}, {message: "Email должен быть - ivanov@gmail.com"})
    email: string;

    @ApiProperty({example: "t213fggf", description: "Пароль"})
    @IsString({message: "Должна быть строка"})
    password: string;

    @ApiProperty({example: "Иван", description: "Имя"})
    @IsString({message: "Должна быть строка"})
    first_name: string;

    @ApiProperty({example: "Иванов", description: "Фамилия"})
    @IsString({message: "Должна быть строка"})
    second_name: string;

    @ApiProperty({example: "89270000000", description: "Номер телефона"})
    @Length(11, 11)
    @IsString({message: "Должна быть строка"})
    phone: string;

    @ApiProperty({example: 18, description: "Возраст"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1)
    age: number;

    @ApiProperty({example: "Россия", description: "Страна"})
    @IsString({message: "Должна быть строка"})
    country: string;
}