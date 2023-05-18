import {IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateReviewDto {
    @ApiProperty({example: "Топ коммент", description: "Заголовок комментария"})
    @IsString({message: "Должно быть строкой"})
    title: string;

    @ApiProperty({example: "Мне понравился фильм.", description: "Текст комментария"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    text: string;
}