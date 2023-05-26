import {IsNumber, IsString, Length, Max, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateFilmDto {
    @ApiProperty({example: "Начало", description: "Название фильма"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string;

    @ApiProperty({example: "Inception", description: "Название фильма на оригинальном языке"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    originalName: string;

    @ApiProperty({example: "http://example.com/poster", description: "Ссылка на постер"})
    @IsString({message: "Должно быть строкой"})
    poster: string;

    @ApiProperty({example: "http://example.com/trailer", description: "Ссылка на трейлер"})
    @IsString({message: "Должно быть строкой"})
    trailer: string;

    @ApiProperty({example: "18+", description: "Возрастной рейтинг"})
    @IsString({message: "Должно быть строкой"})
    mpaaRating: string;

    @ApiProperty({example: 9.0, description: "Оценка фильма на кинопоиске"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1.0)
    @Max(10.0)
    rating: number;

    @ApiProperty({example: 1000000, description: "Количество оценок фильма на кинопоиске"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(0)
    ratingsNumber: number;

    @ApiProperty({example: 2010, description: "Год выхода фильма"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1895)
    @Max(Number(new Date().getFullYear()))
    year: number;

    @ApiProperty({example: 120, description: "Продолжительность фильма в минутах или количество сезонов для сериалов"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(0)
    duration: number;

    @ApiProperty({example: "Фильма начало", description: "Описание фильма"})
    @IsString({message: "Должно быть строкой"})
    description: string;

}
