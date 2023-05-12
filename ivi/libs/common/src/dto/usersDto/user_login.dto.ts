import {IsString} from "class-validator";
import {IsEmail} from "class-validator";


export class UserLoginDto {
    @IsString({message: "Должна быть строка"})
    @IsEmail({}, {message: "Email должен быть - ivanov@gmail.com"})
    email: string;

    @IsString({message: "Должна быть строка"})
    password: string;
}