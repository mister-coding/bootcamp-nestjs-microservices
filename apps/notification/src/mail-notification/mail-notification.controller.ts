import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { broker } from 'constant/broker';
import { NOTIFICATION_AUTH, NOTIFICATION_ORDER_SUCCESS, OrderData, PaymentConfirmationData } from 'types/notification';
import { MailNotificationService } from './mail-notification.service';

@Controller('mail-notification')
export class MailNotificationController {
  constructor(private maileNotifService: MailNotificationService) {}

  @EventPattern(broker.mail.AUTH_NOTIFICATION)
  testuser(data: NOTIFICATION_AUTH) {
    if (data.notifType == 'MAIL_SEND_FORGOT_PASSWORD') {
      this.maileNotifService.sendMailForgotPassword(data.data);
    }else if(data.notifType == 'MAIL_RESET_PASSWORD_SUCCESS'){
      this.maileNotifService.mailNotifSuccessResetPassword(data.data);
    }
  }

  @EventPattern(broker.mail.NEW_ORDER_SUCCESS)
  newOrderSuccess(data: OrderData) {
   this.maileNotifService.mailNotifOrderSuccess(data)
  }

  @EventPattern(broker.mail.PAYMENT_CONFIRMATION)
  mailNotifPaymentConfirmation(data: PaymentConfirmationData) {
   this.maileNotifService.mailNotifPaymentConfirmation(data)
  }
}
