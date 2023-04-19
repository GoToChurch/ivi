import {IsString, Length} from "class-validator";


export class CreateCountryDto {
    @IsString({message: 'Должно быть строкой'})
    name: string

    @IsString({message: 'Должно быть строкой'})
    @Length(2, 2, {message: 'Не меньше 2 и не больше 2'})
    englishName: string
}