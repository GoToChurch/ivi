import {IsString, Length} from "class-validator";


export class CreateReviewDto {
    @IsString({message: 'Должно быть строкой'})
    title: string

    @IsString({message: 'Должно быть строкой'})
    text: string
}