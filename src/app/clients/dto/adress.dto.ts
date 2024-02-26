import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {

    @ApiProperty({
        description: 'The unique identifier of the address',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    id:number;

    @ApiProperty({
        description: 'The street of the address',
        example: '123 Main St',
    })
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({
        description: 'The city of the address',
        example: 'Springfield',
    })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({
        description: 'The state of the address',
        example: 'IL',
    })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({
        description: 'The country of the address',
        example: 'USA',
    })
    @IsNotEmpty()
    @IsString()
    country: string;
}