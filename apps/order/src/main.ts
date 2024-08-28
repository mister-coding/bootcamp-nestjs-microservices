import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/common/filters/http-exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { cwd } from 'process';
import { ReflectionService } from '@grpc/reflection';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const config = new DocumentBuilder()
    .setTitle('Order Services')
    .setDescription('Orders')
    .setVersion('1.0')
    .addTag('orderservices')
    .addServer('/order')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(CustomLoggerService));
  app.useGlobalPipes(new ValidationPipe());

  // Create and configure gRPC microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
      url: '0.0.0.0:50052',
      package: 'order',
      protoPath: [join(cwd(), './proto/order.proto')],
      loader: {
        includeDirs: [
          join(cwd(), './proto'),
          // join(cwd(), './proto/product.proto'),
          // join(cwd(), './proto/payment.proto'),
          // join(cwd(), './proto/shipping.proto'),
          // join(cwd(), './proto/common/enums.proto'),
        ],
      },
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
      url: '0.0.0.0:50053',
      package: 'hero',
      protoPath: [join(cwd(), './proto/hero/hero.proto')],
    },
  });

  // Start gRPC microservice
  await app.startAllMicroservices();

  await app.listen(3000);
}
bootstrap();
