import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


export class AddReviewToUserDTO {

    @ApiProperty({example: '1', description: 'Id пользователя'})
    @IsString({message: "Должна быть строка"})
    readonly user_id: number;

    @ApiProperty({example: '"название какого-либо фильма"', description: 'Название обзора'})
    @IsString({message: "Должна быть строка"})
    readonly value: string;
}