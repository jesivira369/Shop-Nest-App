import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, } from "class-validator";

export class ProductDto {

    @IsOptional()
    @IsNumber()
    @IsPositive()
    id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()   
    @IsNotEmpty()
    price: number;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNumber()
    @IsPositive()   
    @IsNotEmpty()
    stock: number;

    @IsOptional()
    @IsBoolean()
    deleted: boolean;
}