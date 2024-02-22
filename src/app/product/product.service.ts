import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entity/product.entity';
import { StockDto } from '../stock/stock.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  async createProduct(product: ProductDto) {

    const productExists: ProductDto = await this.getProductById(product.id);

    if (productExists) {
      throw new ConflictException(`Product with id ${product.id} already exists`);
    }

    return await this.productRepository.save(product);
  }

  async getProductById(id: number) {
    return await this.productRepository.findOne({
      where: { id }
    });
  }

    async getProducts() {
        return await this.productRepository.find({
            where: { deleted: false }
        });
    }

    async getProductsDeleted() {
        return await this.productRepository.find({
            where: { deleted: true }
        });
    }

    async updateProduct(product: ProductDto) {
        return await this.productRepository.save(product);
    }

    async deleteProduct(id: number) {
        const product: ProductDto = await this.getProductById(id);

        if (!product) {
            throw new ConflictException(`Product with id ${id} does not exist`);
        }

        if (product.deleted) {
            throw new ConflictException(`Product with id ${id} is already deleted`);
        }

        product.deleted = true;

        const rows: UpdateResult = await this.productRepository.update({id}, {deleted: true});

        return rows.affected == 1;
    }

    async restoreProduct(id: number) {
        const product: ProductDto = await this.getProductById(id);

        if (!product) {
            throw new ConflictException(`Product with id ${id} does not exist`);
        }

        if (!product.deleted) {
            throw new ConflictException(`Product with id ${id} is not deleted`);
        }

        const rows: UpdateResult = await this.productRepository.update({id}, {deleted: false});

        return rows.affected == 1;
    }

    async updateStock(stock: StockDto) {
        const product: ProductDto = await this.getProductById(stock.id);

        if (!product) {
            throw new ConflictException(`Product with id ${stock.id} does not exist`);
        }

        if (product.deleted) {
            throw new ConflictException(`Product with id ${stock.id} is deleted`);
        }

        const rows: UpdateResult = await this.productRepository.update({id: stock.id}, {stock: stock.stock});

        return rows.affected == 1;
    }

    async increaseStock(stock: StockDto) {
        const product: ProductDto = await this.getProductById(stock.id);

        if (!product) {
            throw new ConflictException(`Product with id ${stock.id} does not exist`);
        }

        if (product.deleted) {
            throw new ConflictException(`Product with id ${stock.id} is deleted`);
        }

        const rows: UpdateResult = await this.productRepository.increment({id: stock.id}, 'stock', stock.stock);

        return rows.affected == 1;
    }

    async decreaseStock(stock: StockDto) {
        const product: ProductDto = await this.getProductById(stock.id);
    
        if (!product) {
            throw new ConflictException(`Product with id ${stock.id} does not exist`);
        }
    
        if (product.deleted) {
            throw  new ConflictException(`Product with id ${stock.id} is deleted`);
        }
    
        if (stock.stock >= product.stock) {
            await this.productRepository.update({ id: stock.id }, { stock: 0 });
        } else {
            await this.productRepository.decrement({ id: stock.id }, 'stock', stock.stock);
        }
    
        return true;
    }
}
