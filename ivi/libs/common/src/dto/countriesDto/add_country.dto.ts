import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddCountryDto {
    @ApiProperty({example: "Франция", description: "Название страны"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string;
}