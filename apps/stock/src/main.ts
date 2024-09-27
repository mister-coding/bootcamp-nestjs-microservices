import { NestFactory } from '@nestjs/core';
import { StockModule } from './stock.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/common/filters/http-exception/http-exception.filter';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import natsConfig from 'config/nats';

async function bootstrap() {
  const app = await NestFactory.create(StockModule);
  const config = new DocumentBuilder()
    .setTitle('Stock Services')
    .setDescription('Stock')
    .setVersion('1.0')
    .addTag('stockservices')
    .addServer('/stock')
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
  SwaggerModule.setup('stock/swagger', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(CustomLoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('stock');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: natsConfig().servers,
    },
  });
  app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
