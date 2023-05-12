import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddRoleDto {
    @ApiProperty({example: '1', description: 'Id пользователя'})
    @IsString({message: "Должна быть строка"})
    userId: number;

    @ApiProperty({example: 'USER', description: 'Название роли'})
    @IsString({message: "Должна быть строка"})
    value: string;
}