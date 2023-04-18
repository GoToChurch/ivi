import {IsNumber, IsString} from "class-validator";


export class CreateAwardDto {
    @IsString({message: 'Должно быть строкой'})
    name: string

    @IsNumber({}, {message: 'Должно быть числом'})
    year: number
}