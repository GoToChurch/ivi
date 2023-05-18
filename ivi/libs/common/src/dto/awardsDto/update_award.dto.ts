import {IsNumber, IsString, Length, Max, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class UpdateAwardDto {
    @ApiProperty({example: "Оскар", description: "Название награды"})
    @IsString({message: "Должно быть строкой"})
    @Length(1)
    name: string;

    @ApiProperty({example: 2023, description: "Год вручения награды"})
    @IsNumber({}, {message: "Должно быть числом"})
    @Min(1895)
    @Max(Number(new Date().getFullYear()))
    year: number;
}