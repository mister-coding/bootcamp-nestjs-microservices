import { NestFactory } from '@nestjs/core';
import { PaymentModule } from './payment.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/common/filters/http-exception/http-exception.filter';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(PaymentModule);
  const config = new DocumentBuilder()
  .setTitle('Payment Services')
  .setDescription('Payment')
  .setVersion('1.0')
  .addTag('paymentservices')
  .addServer("/payment")
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
