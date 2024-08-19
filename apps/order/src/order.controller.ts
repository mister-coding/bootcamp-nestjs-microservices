import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/auth/auth/auth.guard';
import { GrpcMethod } from '@nestjs/microservices';
import { GetOrderRequest } from 'grpc/order/GetOrderRequest';
import { GetOrderResponse } from 'grpc/order/GetOrderResponse';

@ApiTags('Orders')
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  getHello(): string {
    return this.orderService.getHello();
  }

  @ApiOperation({ summary: 'New order', description: 'New order products' })
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() data: CreateOrderDto, @Request() req) {
    data.user_id = req.user.id;
    const createorder = await this.orderService.createNewOrder(data);
    return {
      data: createorder,
      message: 'create order success',
    };
  }

  @GrpcMethod('OrderService', 'GetOrder')
  async getOrder(data: GetOrderRequest): Promise<GetOrderResponse> {
    console.log('GRRRRRRRRRRRRRRRR');
    return this.orderService.getOrderGrpc(data);
  }
}
