import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Min, Max } from 'class-validator';

export class StockDto {
    @ApiProperty({
        description: 'The unique identifier of the product for which the stock is being updated',
        example: 1,
    })
    @IsNotEmpty()
    @IsPositive()
    @IsNumber()
    id: number;

    @ApiProperty({
        description: 'The new stock quantity for the product. Must be between 0 and 1000.',
        example: 100,
        minimum: 0,
        maximum: 1000,
    })
    @IsNotEmpty()
    @Min(0)
    @Max(1000)
    @IsNumber()
    stock: number;
}