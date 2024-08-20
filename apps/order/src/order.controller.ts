import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/auth/auth/auth.guard';
import {
  Client,
  ClientGrpc,
  GrpcMethod,
  Transport,
} from '@nestjs/microservices';
import { GetOrderRequest } from 'grpc/order/GetOrderRequest';
import { GetOrderResponse } from 'grpc/order/GetOrderResponse';
import { OrderServiceClient } from 'grpc/order/OrderService';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { firstValueFrom, Observable } from 'rxjs';
import { join } from 'path';
import { cwd } from 'process';

interface HeroesService {
  findOne(data: { id: number }): Observable<any>;
}

@ApiTags('Orders')
@Controller()
export class OrderController implements OnModuleInit {
  private orderServiceGrpc: OrderServiceClient;
  private heroesService: HeroesService;

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'hero',
      url: '0.0.0.0:50053',
      protoPath: join(cwd(), 'proto/hero/hero.proto'),
    },
  })
  clients: ClientGrpc;

  @Client({
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50052',
      package: 'order',
      protoPath: [
        join(cwd(), './proto/order.proto'),
        join(cwd(), './proto/user.proto'),
        join(cwd(), './proto/product.proto'),
        join(cwd(), './proto/payment.proto'),
        join(cwd(), './proto/shipping.proto'),
        join(cwd(), './proto/common/enums.proto'),
      ],
    },
  })
  client: ClientGrpc;

  onModuleInit() {
    this.orderServiceGrpc =
      this.client.getService<OrderServiceClient>('OrderService');
    this.heroesService =
      this.clients.getService<HeroesService>('HeroesService');
  }

  constructor(
    private readonly orderService: OrderService,
    // @Inject('ORDER_PACKAGE') private client: ClientGrpc,
  ) {}

  @Get()
  getHello(): string {
    return this.orderService.getHello();
  }

  @Get('grpc-test')
  async grpcTest(): Promise<any> {
    const orderRequest: GetOrderRequest = {
      id: '38173f01-948c-4b35-a25b-1a94607654bb',
    };
    

    // const data = new Promise((resolve, reject) => {
    //   this.orderServiceGrpc.GetOrder(orderRequest, (err, response) => {
    //     if (err) {
    //       return reject(err);
    //     }
    //     resolve(response);
    //   });
    // });

    // const dataOrder = await firstValueFrom()

    
    this.orderServiceGrpc.getOrder(orderRequest, null, null,(err,res)=>{
      console.log("res :",res);
      console.log("err :",err);
    })

    // const order: Observable<GetOrderResponse> = this.orderServiceGrpc.getOrder(orderRequest);
    

    const data = this.heroesService.findOne({ id: 2 });

    const res = await firstValueFrom(data);

    return {
      data: res,
      message: 'grpc',
    };
  }

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): any {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];
    return items.find(({ id }) => id === data.id);
  }

  @GrpcMethod('OrderService')
  async getOrder(
    data: GetOrderRequest,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Promise<GetOrderResponse> {
    console.log('GRRRRRRRRRRRRRRRR');
    return this.orderService.getOrderGrpc(data);
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

 
}
