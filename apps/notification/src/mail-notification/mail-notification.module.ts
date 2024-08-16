import { Module } from '@nestjs/common';
import { MailNotificationController } from './mail-notification.controller';
import { MailNotificationService } from './mail-notification.service';

@Module({
  controllers: [MailNotificationController],
  providers: [MailNotificationService]
})
export class MailNotificationModule {}
