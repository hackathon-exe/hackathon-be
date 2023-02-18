import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import CreateOrderDTO from './dto/createOrder.dto';
import OrderService from './order.service';

@ApiTags('Orders')
@Controller('order')
@ApiBearerAuth()
export class OrderController {
    constructor(private orderService: OrderService) { }

    @Post()
    @ApiOperation({ summary: 'create order' })
    async createOrder(@Body() dto: CreateOrderDTO) {
        return this.orderService.createOrder(dto);
    }

    @Patch(':orderId')
    @ApiOperation({ summary: 'capture payment for order' })
    async capturePayment(@Param('orderId') orderId: string) {
        return this.orderService.capturePayment(orderId);
    }

    @Get(':orderId')
    @ApiOperation({ summary: 'get order by id' })
    getOrderById(@Param('orderId') orderId: string) {
        return this.orderService.findOrderById(orderId);
    }
}