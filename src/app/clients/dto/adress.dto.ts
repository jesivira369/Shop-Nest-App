import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {

    @ApiProperty({
        name: 'id',
        description: 'The unique identifier of the address',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    id:number;

    @ApiProperty({
        name: 'street',
        required: true,
        description: 'The street of the address',
        example: '123 Main St',
    })
    @IsNotEmpty()
    @IsString()
    street: string;

    @ApiProperty({
        name: 'city',
        required: true,
        description: 'The city of the address',
        example: 'Springfield',
    })
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty({
        name: 'state',
        required: true,
        description: 'The state of the address',
        example: 'IL',
    })
    @IsNotEmpty()
    @IsString()
    state: string;

    @ApiProperty({
        name: 'country',
        required: true,
        description: 'The country of the address',
        example: 'USA',
    })
    @IsNotEmpty()
    @IsString()
    country: string;
}