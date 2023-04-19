import {IsNumber, IsString} from "class-validator";


export class CreateFilmDto {
    @IsString({message: 'Должно быть строкой'})
    name: string

    @IsString({message: 'Должно быть строкой'})
    poster: string

    @IsString({message: 'Должно быть строкой'})
    mpaaRating: string

    @IsNumber({}, {message: 'Должно быть числом'})
    rating: number

    @IsNumber({}, {message: 'Должно быть числом'})
    ratingsNumber: number

    @IsNumber({}, {message: 'Должно быть числом'})
    year: number

    @IsString({message: 'Должно быть строкой'})
    duration: string

    @IsString({message: 'Должно быть строкой'})
    description: string
}
