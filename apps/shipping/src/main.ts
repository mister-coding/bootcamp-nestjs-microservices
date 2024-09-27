import { NestFactory } from '@nestjs/core';
import { ShippingModule } from './shipping.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/common/filters/http-exception/http-exception.filter';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ShippingModule);
  const config = new DocumentBuilder()
    .setTitle('Shipping Services')
    .setDescription('Shipping')
    .setVersion('1.0')
    .addTag('shippingservices')
    .addServer('/shipping')
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
  SwaggerModule.setup('shipping/swagger', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(CustomLoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('shipping');
  await app.listen(3000);
}
bootstrap();
