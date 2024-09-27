import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@app/common/filters/http-exception/http-exception.filter';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  const config = new DocumentBuilder()
  .setTitle('Product Services')
  .setDescription('Products')
  .setVersion('1.0')
  .addTag('productservices')
  .addServer("/product")
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
SwaggerModule.setup('product/swagger', app, document);

app.useGlobalFilters(new HttpExceptionFilter());
app.useLogger(app.get(CustomLoggerService));
app.useGlobalPipes(new ValidationPipe())
app.setGlobalPrefix('product');
  await app.listen(3000);
}
bootstrap();
