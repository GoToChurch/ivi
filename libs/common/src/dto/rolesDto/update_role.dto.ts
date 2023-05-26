import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UpdateRoleDto {
    @ApiProperty({example: "USER", description: "Название роли"})
    @IsString({message: "Должна быть строка"})
    value: string;

    @ApiProperty({example: "Пользователь", description: "Описание роли"})
    @IsString({message: "Должна быть строка"})
    description: string;

}