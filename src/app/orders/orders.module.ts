import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { ClientsModule } from '../clients/clients.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule,
    ProductModule
  ]
  ,
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
