import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { services } from 'constant/services';
import natsConfig from 'config/nats';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: services.NOTIF_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: natsConfig().servers,
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
