import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { HttpExceptionFilter } from '@app/common/filters/http-exception/http-exception.filter';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useLogger(app.get(CustomLoggerService))
  await app.listen(3000);
}
bootstrap();
