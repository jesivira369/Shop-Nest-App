import { ConflictException, Injectable } from '@nestjs/common';
import { ClientsService } from '../clients/clients.service';
import { ProductService } from '../product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, LessThanOrEqual, MoreThanOrEqual, Not, Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private clientsService: ClientsService,
    private productService: ProductService
  ) {}

  async createOrder(order: OrderDto) {
    const client = await this.clientsService.getClient(order.client.id);

    if (!client) {
      throw new ConflictException('Client not found');
    }

    for (const item of order.products) {
      const product = await this.productService.getProductById(item.id);
      if (!product) {
        throw new ConflictException('Product not found');
      } else if (product.deleted) {
        throw new ConflictException('Product not available');
      }
    }

    return this.orderRepository.save(order);
  }

  async getOrder(id: string) {
    return this.orderRepository.findOne({
      where: { id },
    });
  }

  async getPendingOrders() {
    return this.orderRepository.find({
      where: { confirmedAt: IsNull() },
    });
  }

  async getConfirmedOrders(start?: Date, end?: Date) {
    const whereConditions = {
      confirmedAt: Not(IsNull()),
    };

    if (start && end) {
      whereConditions['createdAt'] = Between(start, end);
    } else if (start) {
      whereConditions['createdAt'] = MoreThanOrEqual(start);
    } else if (end) {
      whereConditions['createdAt'] = LessThanOrEqual(end);
    }

    return this.orderRepository.find({
      where: whereConditions,
      order: { createdAt: 'ASC' },
    });
  }

  async confirmOrder(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new ConflictException('Order not found');
    }

    if (order.confirmedAt) {
      throw new ConflictException('Order already confirmed');
    }

    const rows = await this.orderRepository.update({ id }, { confirmedAt: new Date() });

    return rows.affected ==1;

  }

  async getOrdersByClient(idClient: number) {
    return await this.orderRepository.find({
      where: { client: { id: idClient } },
    });
  }
}
