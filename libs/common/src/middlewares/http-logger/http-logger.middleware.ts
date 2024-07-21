import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    new CustomLoggerService().log(`Request ${new Date().toISOString()} ${req.method} ${req.url}`)
    next();
  }
}
