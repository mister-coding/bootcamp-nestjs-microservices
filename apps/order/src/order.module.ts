import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CommonModule } from '@app/common';
import { AuthModule } from '@app/auth';
import { RepositoriesModule } from '@app/repositories';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { services } from 'constant/services';
import natsConfig from 'config/nats';
import { join } from 'path';
import { cwd } from 'process';

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
    // ClientsModule.register([
    //   {
    //     name: 'ORDER_PACKAGE',
    //     transport: Transport.GRPC,
    //     options: {
    //       url: 'localhost:50051',
    //       package: 'order',
    //       protoPath: [
    //         join(cwd(), './proto/order.proto'),
    //         join(cwd(), './proto/user.proto'),
    //         join(cwd(), './proto/product.proto'),
    //         join(cwd(), './proto/payment.proto'),
    //         join(cwd(), './proto/shipping.proto'),
    //         join(cwd(), './proto/common/enums.proto'),
    //       ],
    //     },
    //   },
    // ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
