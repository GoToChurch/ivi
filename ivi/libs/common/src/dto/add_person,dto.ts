import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddPersonDto {
    @ApiProperty({example: 1, description: "id персоны"})
    @IsString({message: 'Должно быть строкой'})
    id: number
}