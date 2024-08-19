import { Module } from '@nestjs/common';
import { MailNotificationController } from './mail-notification.controller';
import { MailNotificationService } from './mail-notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { cwd } from 'process';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: 'ORDER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          url: 'order:50051',
          package: 'order',
          protoPath: join(cwd(), './proto/order.proto'),
        },
      },
    ]),
  ],
  controllers: [MailNotificationController],
  providers: [MailNotificationService]
})
export class MailNotificationModule {}
