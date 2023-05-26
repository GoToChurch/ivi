import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UpdateCountryDto {
    @ApiProperty({example: "Франция", description: "Название страны"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string;

    @ApiProperty({example: "fr", description: "Название страны на английском языке"})
    @IsString({message: "Должно быть строкой"})
    @Length(2, 3, {message: "Не меньше 2 и не больше 3"})
    englishName: string;
}