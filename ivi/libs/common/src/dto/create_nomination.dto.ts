import {IsString} from "class-validator";


export class CreateNominationDto {
    @IsString({message: 'Должно быть строкой'})
    name: string
}