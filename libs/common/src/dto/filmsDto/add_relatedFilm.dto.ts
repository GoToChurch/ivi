import {IsNumber, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddRelatedFilmDto {
    @ApiProperty({example: 2, description: "id фильма"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1)
    id: number;
}