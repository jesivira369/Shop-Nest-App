import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString } from 'class-validator';
import { AddressDto } from './adress.dto';

export class ClientDto {
    @ApiProperty({
        name: 'id',
        type: Number,
        description: 'The unique identifier of the client',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    id: number;

    @ApiProperty({
        name: 'name',
        description: 'The name of the client',
        type: String,
        example: 'John Doe',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        name: 'email',
        description: 'The email address of the client',
        type: String,
        example: 'jesus@example.com',
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Type(() => AddressDto)
    @ApiProperty({
        name: 'address',
        required: true,
        description: 'The address of the client',
        type: AddressDto,
    })
    @Type(() => AddressDto)
    @IsObject()
    @IsNotEmpty()
    address: AddressDto;
}