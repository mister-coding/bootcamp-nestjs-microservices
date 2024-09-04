import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import natsConfig from 'config/nats';

@Injectable()
export class NatsService implements OnModuleInit, OnModuleDestroy {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: natsConfig().servers,
      },
    });
  }

  onModuleInit() {
    this.client
      .connect()
      .then(() => console.log('Connected to NATS'))
      .catch((error) => {
        throw new InternalServerErrorException('Nats error :', error);
      });
  }

  onModuleDestroy() {
    this.client.close();
  }
}
