import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { RepositoriesService } from '@app/repositories';
import { Prisma } from '@prisma/client';
import { services } from 'constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { broker } from 'constant/broker';
import { OrderData } from 'types/notification';
import { GetOrderRequest } from 'grpc/order/GetOrderRequest';
import { GetOrderResponse } from 'grpc/order/GetOrderResponse';
import { Order } from 'grpc/order/Order';

@Injectable()
export class OrderService {
  constructor(
    private repos: RepositoriesService,
    @Inject(services.NOTIF_SERVICE) private client: ClientProxy,
  ) {}

  getHello(): string {
    return 'Order services!';
  }

  async createNewOrder(data: CreateOrderDto) {
    let orderAmount = 0;

    const products = await this.repos.product.table.findMany({
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
    const createOrder = await this.repos.order.create(orderData);
    if (createOrder) {
      const orderNotifPayload: OrderData = {
        order_id: createOrder.id,
      };
      this.client.emit(broker.mail.NEW_ORDER_SUCCESS, orderNotifPayload);
    }
    return createOrder;
  }

  async getOrderGrpc(data: GetOrderRequest): Promise<GetOrderResponse> {
    const order = await this.repos.order.findById(data.id);

    if (!order) {
      throw new Error('Order not found');
    }

    const orderResponse: Order = {
      id: order.id,
      userId: order.user_id,
      orderNo: order.order_no,
      amount: order.amount,
      user: {
        id: order.user.id,
        name: order.user.name,
        email: order.user.email,
      },
      orderItems: order.order_item.map((item) => ({
        id: item.id,
        order_id: item.order_id,
        product_id: item.product_id,
        qty: item.qty,
        product_price: item.product_price,
        product: {
          id: item.product.id,
          product_name: item.product.product_name,
        },
      })),
      shipping: order.shipping.map((ship) => ({
        id: ship.id,
        order_id: ship.order_id,
        receive_name: ship.receive_name,
        receive_address: ship.receive_address,
        receive_phone: ship.receive_phone,
        shipping_status: ship.shipping_status as any,
      })),
      payment: order.payment.map((pay) => ({
        id: pay.id,
        order_id: pay.order_id,
        amount: pay.amount,
        payment_method: pay.payment_method as any,
        payment_status: pay.payment_status as any,
      })),
    };

    return { order: orderResponse };
  }
}
