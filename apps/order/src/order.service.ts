import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { RepositoriesService } from '@app/repositories';
import { Prisma } from '@prisma/client';
import { services } from 'constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { broker } from 'constant/broker';
import { OrderData } from 'types/notification';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { NatsService } from '@app/nats';

@Injectable()
export class OrderService {

  private logger = new CustomLoggerService();
  constructor(
    private respos: RepositoriesService,
    @Inject(services.NOTIF_SERVICE) private client: ClientProxy,
    @Inject(services.STOCK_SERVICE) private clientStock: ClientProxy,
    private natsService: NatsService
  ) {}

  getHello(): string {
    return 'Order services!';
  }

  async createNewOrder(data: CreateOrderDto) {
    let orderAmount = 0;

    this.logger.log("Creae new order");

    const products = await this.respos.product.table.findMany({
      where: {
        id: {
          in: data.order_item.map((item) => item.product_id),
        },
      },
    });

    products.forEach((product) => {
      const findProduct = data.order_item.find(
        (pr) => pr.product_id == product.id,
      );
      orderAmount += product.price * findProduct.qty;
    });

    const productItem = products.map((product) => {
      const findProduct = data.order_item.find(
        (pr) => pr.product_id == product.id,
      );
      return {
        product_id: product.id,
        product_price: product.price,
        qty: findProduct.qty,
        amount: product.price * findProduct.qty,
      };
    });

    const orderData: Prisma.orderCreateInput = {
      notes: data.notes,
      user: {
        connect: {
          id: data.user_id,
        },
      },
      order_item: {
        createMany: {
          data: productItem,
        },
      },

      order_no: `${new Date().getTime()}`,
      amount: orderAmount,
      payment: {
        create: {
          amount: orderAmount,
          payment_method: data.payment.payment_method,
        },
      },
      shipping: {
        create: data.shipping,
      },
    };
    const createOrder = await this.respos.order.create(orderData);
    if (createOrder) {
      const orderNotifPayload: OrderData = {
        order_id: createOrder.id,
      };
      this.client.emit(broker.mail.NEW_ORDER_SUCCESS, orderNotifPayload);
      this.clientStock.emit(broker.stock.SALES_STOCK, orderNotifPayload);
    }
    return createOrder;
  }

  async getOrdersByUser(user_id: string) {
    return await this.respos.order.findManyByUserId(user_id);
  }
}
