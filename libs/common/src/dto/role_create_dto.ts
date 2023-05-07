import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleGTO {

    @ApiProperty({example: 'USER', description: 'Название роли'})
    @IsString({message: "Должна быть строка"})
    readonly value: string;

    @ApiProperty({example: 'Пользователь', description: 'Описание роли'})
    @IsString({message: "Должна быть строка"})
    readonly description: string;

}