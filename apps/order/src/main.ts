import { NestFactory } from '@nestjs/core';
import { OrderModule } from './order.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/common/filters/http-exception/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  const config = new DocumentBuilder()
  .setTitle('Order Services')
  .setDescription('Orders')
  .setVersion('1.0')
  .addTag('orderservices')
  .addServer("/order")
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
app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
