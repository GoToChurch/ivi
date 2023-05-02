import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateAwardDto {
    @ApiProperty({example: "Оскар", description: "Название награды"})
    @IsString({message: 'Должно быть строкой'})
    name: string

    @ApiProperty({example: 2023, description: "Год вручения награды"})
    @IsNumber({}, {message: 'Должно быть числом'})
    year: number
}