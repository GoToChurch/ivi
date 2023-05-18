import {IsNumber, IsString, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddRoleDto {
    @ApiProperty({example: 1, description: "Id пользователя"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1)
    userId: number;

    @ApiProperty({example: "USER", description: "Название роли"})
    @IsString({message: "Должна быть строка"})
    value: string;
}