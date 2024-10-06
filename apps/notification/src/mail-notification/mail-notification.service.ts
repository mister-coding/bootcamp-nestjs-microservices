import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { RepositoriesService } from '@app/repositories';
import { MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { UserService } from 'grpc/user.service';
import {
  NOTIFICATION_AUTH,
  NOTIFICATION_AUTH_DATA,
  NOTIFICATION_ORDER_SUCCESS,
  OrderData,
  PaymentConfirmationData,
  ShippingDataNotification,
} from 'types/notification';

@Injectable()
export class MailNotificationService implements OnModuleInit{

  private userServices: UserService

  constructor(
    private readonly mailerService: MailerService,
    private repos: RepositoriesService,
    @Inject('USER_PACKAGE') private client: ClientGrpc
  ) {}

  onModuleInit() {
    this.userServices = this.client.getService<UserService>('UserService');
  }


  //send mail forgot password
  async sendMailForgotPassword(data: NOTIFICATION_AUTH_DATA) {

    const user = await this.userServices.FindByEmail({email:data.email});

    console.log("user :",user);
    

    new CustomLoggerService(MailNotificationService.name).log(
      'Send email forgot password',
      data.email,
    );

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

  async mailNotifPaymentConfirmation(data: PaymentConfirmationData) {
    const payment = await this.repos.payment.getPaymentById(data.payment_id);
    new CustomLoggerService().warn('Konfirmasi pembayaran success :', data);
    this.mailerService
      .sendMail({
        to: "admin@tokoonline.com", // list of receivers
        subject: 'Payment confirmation ' + payment.order.order_no, // Subject line
        template: 'payment/payment-confirmation',
        context: {
          ...payment
        },
      })
      .then(() => {
        new CustomLoggerService().debug(
          'Success send email new order :',
          payment,
        );
      })
      .catch((err) => {
        new CustomLoggerService().error(
          'Error send email forgot password :',
          err,
        );
      });
  }

  async mailNotifPaymentStatus(data: PaymentConfirmationData) {
    const payment = await this.repos.payment.getPaymentById(data.payment_id);
    new CustomLoggerService().warn('Konfirmasi pembayaran success :', data);
    this.mailerService
      .sendMail({
        to: payment.order.user.email, // list of receivers
        subject: 'Payment Status ' + payment.order.order_no, // Subject line
        template: 'payment/payment-status',
        context: {
          ...payment
        },
      })
      .then(() => {
        new CustomLoggerService().debug(
          'Success send email new order :',
          payment,
        );
      })
      .catch((err) => {
        new CustomLoggerService().error(
          'Error send email forgot password :',
          err,
        );
      });
  }

  async mailNotifShippingStatus(data: ShippingDataNotification) {
    const shipping = await this.repos.shipping.findById(data.shipping_id);
    new CustomLoggerService().warn('Notifikasi shipping status :', data);
    this.mailerService
      .sendMail({
        to: shipping.order.user.email, // list of receivers
        subject: 'Shiping Status ' + shipping.order.order_no, // Subject line
        template: 'shipping/update-status',
        context: {
          ...shipping
        },
      })
      .then(() => {
        new CustomLoggerService().debug(
          'Success send email new order :',
          shipping,
        );
      })
      .catch((err) => {
        new CustomLoggerService().error(
          'Error send email forgot password :',
          err,
        );
      });
  }
}
