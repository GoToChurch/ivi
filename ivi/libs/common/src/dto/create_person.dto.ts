import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreatePersonDto {
    @ApiProperty({example: "Омар Си", description: "Полное имя персоны"})
    @IsString({message: 'Должно быть строкой'})
    name: string

    @ApiProperty({example: "Omar cy", description: "Полное имя персоны на оригальном языке"})
    @IsString({message: 'Должно быть строкой'})
    originalName: string

    @ApiProperty({example: "http://example.com/photo", description: "Ссылка на фото персоны"})
    @IsString({message: 'Должно быть строкой'})
    photo: string
}