import { Module } from '@nestjs/common';
import { ShippingController } from './shipping.controller';
import { ShippingService } from './shipping.service';
import { AuthModule } from '@app/auth';
import { CommonModule } from '@app/common';
import { RepositoriesModule } from '@app/repositories';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { services } from 'constant/services';
import natsConfig from 'config/nats';

@Module({
  imports: [
    AuthModule,
    CommonModule.initSentry(),
    RepositoriesModule,
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
  controllers: [ShippingController],
  providers: [ShippingService],
})
export class ShippingModule {}
