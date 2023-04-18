import {IsString} from "class-validator";


export class CreateProfessionDto {
    @IsString({message: 'Должно быть строкой'})
    name: string
}