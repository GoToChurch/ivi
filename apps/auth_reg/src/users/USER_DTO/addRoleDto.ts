import {IsString} from "class-validator";


export class AddRoleToUserDTO {

    @IsString({message: "Должна быть строка"})
    readonly user_id: number;

    @IsString({message: "Должна быть строка"})
    readonly value: string;
}