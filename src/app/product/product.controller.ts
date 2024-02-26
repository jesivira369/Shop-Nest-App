import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { StockDto } from '../stock/stock.dto';

@Controller('products')
@ApiTags('Products')

export class ProductController {

    constructor(private productService: ProductService) { 

    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiBody({
        description: 'Product data',
        type: ProductDto,
        examples: {
            aHighEndBicycle: {
                summary: 'A high-end bicycle example',
                value: {
                    name: "Pinarello Dogma F12",
                    price: 12000,
                    description: "An elite performance racing bicycle with cutting-edge aerodynamics and ultra-light carbon frame.",
                    stock: 10,
                },
            },
        },
    })
    createProduct(@Body() product: ProductDto) {
        return this.productService.createProduct(product);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Array of products retrieved successfully.' })
    getProducts() {
        return this.productService.getProducts();
    }

    @Get('/deleted')
    @ApiOperation({ summary: 'Get all deleted products' })
    @ApiResponse({ status: 200, description: 'Array of deleted products retrieved successfully.' })
    getProductsDeleted() {
        return this.productService.getProductsDeleted();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by id' })
    @ApiResponse({ status: 200, description: 'Product retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
    getProductById(@Param('id') id: number) {
        return this.productService.getProductById(id);
    }

    @Put()
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({ status: 200, description: 'Product updated successfully.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    updateProduct(@Body() product: ProductDto) {
        return this.productService.updateProduct(product);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(id);
    }

    @Patch('/restore/:id')
    @ApiOperation({ summary: 'Restore a deleted product' })
    @ApiResponse({ status: 200, description: 'Product restored successfully.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
    restoreProduct(@Param('id') id: number) {
        return this.productService.restoreProduct(id);
    }

    @Patch('/stock')
    @ApiOperation({ summary: 'Update the stock of a product' })
    @ApiResponse({ status: 200, description: 'Stock updated successfully.' })
    updateStock(@Body() stock: StockDto) {
        return this.productService.updateStock(stock);
    }

    @Patch('/increase-stock')
    @ApiOperation({ summary: 'Increase the stock of a product' })
    @ApiResponse({ status: 200, description: 'Stock increased successfully.' })
    increaseStock(@Body() stock: StockDto) {
        return this.productService.increaseStock(stock);
    }

    @Patch('/decrease-stock')
    @ApiOperation({ summary: 'Decrease the stock of a product' })
    @ApiResponse({ status: 200, description: 'Stock decreased successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid stock amount provided.' })
    decreaseStock(@Body() stock: StockDto) {
        return this.productService.decreaseStock(stock);
    }

}
