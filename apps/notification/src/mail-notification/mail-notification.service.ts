import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { NOTIFICATION_AUTH, NOTIFICATION_AUTH_DATA } from 'types/notification';

@Injectable()
export class MailNotificationService {
  constructor(private readonly mailerService: MailerService) {}

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
}
