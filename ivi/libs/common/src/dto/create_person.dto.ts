import {IsString} from "class-validator";


export class CreatePersonDto {
    @IsString({message: 'Должно быть строкой'})
    name: string

    @IsString({message: 'Должно быть строкой'})
    originalName: string

    @IsString({message: 'Должно быть строкой'})
    photo: string
}