import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MailModule } from '@app/mail';
import { MailNotificationModule } from './mail-notification/mail-notification.module';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule,
    MailModule, 
    MailNotificationModule
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
