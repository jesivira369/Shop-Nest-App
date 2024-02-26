import { IsArray, IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ClientDto } from 'src/app/clients/dto/client.dto';
import { ProductDto } from 'src/app/product/dto/product.dto';

export class OrderDto {

    @ApiProperty({
        name: 'id',
        description: 'The unique identifier of the address',
        example: 1,
        required: false,
        type: String,
    })
    @IsOptional()
    @IsUUID()
    id?: string;

    @ApiProperty({
        name: 'createdAt',
        description: 'The date and time when the order was created',
        example: '2021-08-01T12:00:00',
        required: false,
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @ApiProperty({
        name: 'updatedAt',
        description: 'The date and time when the order was last updated',
        example: '2021-08-01T12:00:00',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;

    @ApiProperty({
        name: 'confirmedAt',
        description: 'The date and time when the order was confirmed',
        example: '2021-08-01T12:00:00',
        required: false,
        type: String,
    })
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    confirmedAt?: Date;

    @ApiProperty({
        name: 'client',
        required: true,
        description: 'The client that made the order',
        type: ClientDto,
    })
    @IsNotEmpty()
    @Type(() => ClientDto)
    client: ClientDto;

    @ApiProperty({
        name: 'products',
        required: true,
        description: 'The products that were ordered',
        type: [ProductDto],
    })
    @IsArray()
    @IsNotEmpty()
    @Type(() => ProductDto)
    products: ProductDto[];

}