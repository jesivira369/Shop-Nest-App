import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsPositive, IsString } from 'class-validator';
import { AddressDto } from './adress.dto';

export class ClientDto {
    @ApiProperty({
        description: 'The unique identifier of the client',
        example: 1,
        required: false,
    })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    id: number;

    @ApiProperty({
        description: 'The name of the client',
        example: 'John Doe',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email address of the client',
        example: 'jesus@example.com',
        required: true,
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Type(() => AddressDto)
    @ApiProperty({
        description: 'The address of the client',
        type: () => AddressDto,
    })
    @IsObject()
    @IsNotEmpty()
    address: AddressDto;
}