import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import natsConfig from 'config/nats';

async function bootstrap() {
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    NotificationModule,
    {
      transport: Transport.NATS,
      options: {
        servers: natsConfig().servers,
      },
    },
  );
  await app.listen();
}
bootstrap();
