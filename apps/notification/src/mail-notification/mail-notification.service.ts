import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { RepositoriesService } from '@app/repositories';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {
  NOTIFICATION_AUTH,
  NOTIFICATION_AUTH_DATA,
  NOTIFICATION_ORDER_SUCCESS,
  OrderData,
  PaymentConfirmationData,
} from 'types/notification';

@Injectable()
export class MailNotificationService {
  constructor(
    private readonly mailerService: MailerService,
    private repos: RepositoriesService,
  ) {}

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
}
