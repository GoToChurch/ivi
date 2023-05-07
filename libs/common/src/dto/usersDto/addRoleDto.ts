import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddRoleToUserDTO {

    @ApiProperty({example: '1', description: 'Id пользователя'})
    @IsString({message: "Должна быть строка"})
    readonly user_id: number;

    @ApiProperty({example: 'USER', description: 'Название роли'})
    @IsString({message: "Должна быть строка"})
    readonly value: string;
}