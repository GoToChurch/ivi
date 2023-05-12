import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UpdateGenreDto {
    @ApiProperty({example: "Драма", description: "Название жанра"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string
}