import {IsNumber, IsString} from "class-validator";


export class CreateFilmDto {
    @IsString({message: 'Должно быть строкой'})
    name: string

    @IsString({message: 'Должно быть строкой'})
    originalName: string

    @IsString({message: 'Должно быть строкой'})
    poster: string

    @IsString({message: 'Должно быть строкой'})
    trailer: string

    @IsString({message: 'Должно быть строкой'})
    mpaaRating: string

    @IsNumber({}, {message: 'Должно быть числом'})
    rating: number

    @IsNumber({}, {message: 'Должно быть числом'})
    ratingsNumber: number

    @IsNumber({}, {message: 'Должно быть числом'})
    year: number

    @IsNumber({}, {message: 'Должно быть числом'})
    duration: number

    @IsString({message: 'Должно быть строкой'})
    description: string

}
