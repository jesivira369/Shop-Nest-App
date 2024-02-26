import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/order.dto';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';
import { ApiTags } from '@nestjs/swagger';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    createOrder(@Body() order: OrderDto) {
        return this.ordersService.createOrder(order);
    }

    @Get('/pending')
    getPendingOrders() {
        return this.ordersService.getPendingOrders();
    }

    @Get('/confirmed')
    getConfirmedOrders(@Query('start', ParseDatePipe) start: Date, @Query('end', ParseDatePipe) end: Date){
        return this.ordersService.getConfirmedOrders(start, end);
    }

    @Get('/:id')
    getOrder(@Param('id') id: string) {
        return this.ordersService.getOrder(id);
    }

    @Get('/client/:idClient')
    getOrdersByClient(@Param('idClient') idClient: number) {
        return this.ordersService.getOrdersByClient(idClient);
    }

    @Patch('/confirm/:id')
    confirmOrder(@Param('id') id: string) {
        return this.ordersService.confirmOrder(id);
    }
}
