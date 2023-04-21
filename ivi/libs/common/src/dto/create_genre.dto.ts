import {IsString} from "class-validator";


export class CreateGenreDto {
    @IsString({message: 'Должно быть строкой'})
    name: string

    @IsString({message: 'Должно быть строкой'})
    englishName: string
}