import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { HttpExceptionFilter } from '@app/common/filters/http-exception/http-exception.filter';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { cwd } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  const config = new DocumentBuilder()
    .setTitle('User Services')
    .setDescription('User data, register, login')
    .setVersion('1.0')
    .addTag('userservice')
    .addServer("/user")
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
  SwaggerModule.setup('user/swagger', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(CustomLoggerService));
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('user');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options:{
      url: "0.0.0.0:50053",
      package: "user",
      protoPath:[join(cwd(),'./proto/user.proto')]
    }
  })

  await app.listen(3000);
}
bootstrap();
