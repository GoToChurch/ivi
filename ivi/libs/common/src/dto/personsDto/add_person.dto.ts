import {IsNumber, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddPersonDto {
    @ApiProperty({example: 1, description: "id персоны"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1)
    id: number;
}