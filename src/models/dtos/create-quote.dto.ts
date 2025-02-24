import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuoteDto {
    @IsNumber()
    amount: number;

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsString()
    @IsNotEmpty()
    to: string;
}
