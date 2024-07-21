import { BaseExceptionFilter, HttpAdapterHost, NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { HttpExceptionFilter } from '@app/common/exceptions/http-exception/http-exception.filter';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import * as Sentry from "@sentry/nestjs"

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useLogger(app.get(CustomLoggerService));

  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));
  
  await app.listen(3000);
}
bootstrap();
