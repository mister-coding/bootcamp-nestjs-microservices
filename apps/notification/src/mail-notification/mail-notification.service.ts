import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { RepositoriesService } from '@app/repositories';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { GetOrderRequest } from 'grpc/order/GetOrderRequest';
import { GetOrderResponse } from 'grpc/order/GetOrderResponse';
import { OrderServiceClient } from 'grpc/order/OrderService';
import { firstValueFrom } from 'rxjs';
import {
  NOTIFICATION_AUTH,
  NOTIFICATION_AUTH_DATA,
  NOTIFICATION_ORDER_SUCCESS,
  OrderData,
} from 'types/notification';

@Injectable()
export class MailNotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private repos: RepositoriesService,
    @Inject('ORDER_PACKAGE') private client: ClientGrpc,
  ) {}

  private orderService: OrderServiceClient;

  onModuleInit() {
    this.orderService =
      this.client.getService<OrderServiceClient>('OrderService');
  }

  //send mail forgot password
  sendMailForgotPassword(data: NOTIFICATION_AUTH_DATA) {
    this.mailerService
      .sendMail({
        to: data.email, // list of receivers
        subject: 'Link reset password', // Subject line
        template: 'auth/link-reset-password',
        context: data,
      })
      .then(() => {
        new CustomLoggerService().debug(
          'Success send email forgot password :',
          data.email,
        );
      })
      .catch((err) => {
        new CustomLoggerService().error(
          'Error send email forgot password :',
          err,
        );
      });
  }

  //send mail success reset password
  mailNotifSuccessResetPassword(data: NOTIFICATION_AUTH_DATA) {
    this.mailerService
      .sendMail({
        to: data.email, // list of receivers
        subject: 'Reset password success', // Subject line
        template: 'auth/success-reset-password',
        context: data,
      })
      .then(() => {
        new CustomLoggerService().debug(
          'Success send email forgot password :',
          data.email,
        );
      })
      .catch((err) => {
        new CustomLoggerService().error(
          'Error send email forgot password :',
          err,
        );
      });
  }

  async mailNotifOrderSuccess(data: OrderData) {
    const order = await this.repos.order.findById(data.order_id);
    this.mailerService
      .sendMail({
        to: order.user.email, // list of receivers
        subject: 'New order ' + order.order_no, // Subject line
        template: 'order/new-order',
        context: {
          ...order,
          payment: order.payment[0],
          shipping: order.shipping[0],
        },
      })
      .then(() => {
        new CustomLoggerService().debug(
          'Success send email new order :',
          order,
        );
      })
      .catch((err) => {
        new CustomLoggerService().error(
          'Error send email forgot password :',
          err,
        );
      });
  }

  async mailNotifOrderSuccessGrpc(data: OrderData) {
    new CustomLoggerService().warn("Notification Order Success : ",data)
    // const order = await this.repos.order.findById(data.order_id);
    const orderRequest: GetOrderRequest = { id: data.order_id };
    // const orderResponse: GetOrderResponse = await firstValueFrom(
    //   this.orderService.GetOrder(orderRequest),
    // );

    this.orderService.getOrder(orderRequest, (err, response) => {
     
      if (err) {
        console.error(err);
      } else {
        const order = response.order;
        this.mailerService
          .sendMail({
            to: order.user.email, // list of receivers
            subject: 'New order ' + order.orderNo, // Subject line
            template: 'order/new-order',
            context: {
              ...order,
              payment: order.payment[0],
              shipping: order.shipping[0],
            },
          })
          .then(() => {
            new CustomLoggerService().debug(
              'Success send email new order :',
              order,
            );
          })
          .catch((err) => {
            new CustomLoggerService().error(
              'Error send email forgot password :',
              err,
            );
          });
      }
    });
  }
  
}
