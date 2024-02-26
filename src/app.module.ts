import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './app/product/product.module';
import { ClientsModule } from './app/clients/clients.module';
import { OrdersModule } from './app/orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3304,
      "username": "root",
      "password": "123456",
      "database": "mysql-nestjs",
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    ProductModule,
    ClientsModule,
    OrdersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
