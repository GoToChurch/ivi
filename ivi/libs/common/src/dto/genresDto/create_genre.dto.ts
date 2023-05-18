import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateGenreDto {
    @ApiProperty({example: "Драма", description: "Название жанра"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string;

    @ApiProperty({example: "drama", description: "Название жанра на английском языке"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    englishName: string;
}