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
        name: 'USER_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(cwd(), './proto/user/user.proto'),
          url:"user:50053"
        },
      },
    ]),
  ],
  controllers: [MailNotificationController],
  providers: [MailNotificationService]
})
export class MailNotificationModule {}
