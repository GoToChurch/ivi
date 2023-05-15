import {IsString, Length} from "class-validator";
import {IsEmail} from "class-validator";

export class RegistrationDto {

    @IsString({message: "Должна быть строка"})
    @IsEmail({}, {message: "Email должен быть - ivanov@gmail.com"})
    readonly email: string;

    @IsString({message: "Должна быть строка"})
    readonly password: string;

    @IsString({message: "Должна быть строка"})
    readonly first_name: string;

    @IsString({message: "Должна быть строка"})
    readonly second_name: string;

    @Length(11, 12)
    @IsString({message: "Должна быть строка"})
    readonly phone: string;

    @Length(1, 3)
    @IsString({message: "Должна быть строка"})
    readonly age: number;

    @IsString({message: "Должна быть строка"})
    readonly country: string;

}