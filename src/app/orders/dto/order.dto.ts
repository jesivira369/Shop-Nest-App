import { IsArray, IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ClientDto } from 'src/app/clients/dto/client.dto';
import { ProductDto } from 'src/app/product/dto/product.dto';

export class OrderDto {

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    id?: string;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    createdAt?: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    updatedAt?: Date;

    @ApiProperty()
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    confirmedAt?: Date;

    @ApiProperty()
    @IsNotEmpty()
    @Type(() => ClientDto)
    client: ClientDto;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    @Type(() => ProductDto)
    products: ProductDto[];

}