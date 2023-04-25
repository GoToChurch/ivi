import {IsString, Length} from "class-validator";

export class CreateRoleGTO {

    @IsString({message: "Должна быть строка"})
    readonly value: string;

    @IsString({message: "Должна быть строка"})
    readonly description: string;

}