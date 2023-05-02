import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateGenreDto {
    @ApiProperty({example: "Драма", description: "Название жанра"})
    @IsString({message: 'Должно быть строкой'})
    name: string

    @ApiProperty({example: "drama", description: "Название жанра на английском языке"})
    @IsString({message: 'Должно быть строкой'})
    englishName: string
}