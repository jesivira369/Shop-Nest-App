import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class ProductDto {
    @ApiProperty({
        description: 'The unique identifier of the product',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    id: number;

    @ApiProperty({
        description: 'The name of the product',
        example: 'Pinarello Dogma F12',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The price of the product in USD',
        example: 12000,
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number;

    @ApiProperty({
        description: 'A short description of the product',
        example: 'An elite performance racing bicycle with cutting-edge aerodynamics and ultra-light carbon frame.',
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        description: 'The stock quantity of the product',
        example: 10,
    })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    stock: number;

    @ApiProperty({
        description: 'Indicates whether the product is deleted',
        example: false,
        required: false,
    })
    @IsOptional()
    @IsBoolean()
    deleted: boolean;
}