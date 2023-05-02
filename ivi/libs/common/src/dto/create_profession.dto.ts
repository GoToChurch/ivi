import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class CreateProfessionDto {
    @ApiProperty({example: "Режиссер", description: "Название профессии"})
    @IsString({message: 'Должно быть строкой'})
    name: string
}