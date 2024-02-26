import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/order.dto';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({
    type: OrderDto,
    description: 'Order data',
    examples: {
      exampleOrder: {
        summary: 'An example of an order',
        value: {
          products: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
          client: {
            id: 1,
          },
        },
      },
    },
  })
  createOrder(@Body() order: OrderDto) {
    return this.ordersService.createOrder(order);
  }

  @Get('/pending')
  @ApiOperation({ summary: 'Get pending orders' })
  @ApiResponse({ status: 200, description: 'List of pending orders retrieved successfully.' })
  getPendingOrders() {
    return this.ordersService.getPendingOrders();
  }

  @Get('/confirmed')
  @ApiOperation({ summary: 'Get confirmed orders' })
  @ApiQuery({ name: 'start', type: 'string', required: false, description: 'Start date' })
  @ApiQuery({ name: 'end', type: 'string', required: false, description: 'End date' })
  @ApiResponse({ status: 200, description: 'List of confirmed orders retrieved successfully.' })
  getConfirmedOrders(@Query('start', ParseDatePipe) start: Date, @Query('end', ParseDatePipe) end: Date) {
    return this.ordersService.getConfirmedOrders(start, end);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get an order by id' })
  @ApiResponse({ status: 200, description: 'Order retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  getOrder(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Get('/client/:idClient')
  @ApiOperation({ summary: 'Get orders by client id' })
  @ApiResponse({ status: 200, description: 'Orders for the specified client retrieved successfully.' })
  @ApiParam({ name: 'idClient', type: 'number', description: 'Client ID' })
  getOrdersByClient(@Param('idClient') idClient: number) {
    return this.ordersService.getOrdersByClient(idClient);
  }

  @Patch('/confirm/:id')
  @ApiOperation({ summary: 'Confirm an order' })
  @ApiResponse({ status: 200, description: 'Order confirmed successfully.' })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  @ApiParam({ name: 'id', type: 'string', description: 'Order ID' })
  confirmOrder(@Param('id') id: string) {
    return this.ordersService.confirmOrder(id);
  }
}
