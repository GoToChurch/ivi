import {IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddRelatedFilmDto {
    @ApiProperty({example: 2, description: "id фильма"})
    @IsString({message: 'Должно быть строкой'})
    id: number
}
