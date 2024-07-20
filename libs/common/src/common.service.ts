import { Injectable } from '@nestjs/common';
import { CustomLoggerService } from './logger/custom-logger/custom-logger.service';

@Injectable()
export class CommonService {
  constructor(private loggerService: CustomLoggerService) {}

  get logger() {
    return this.loggerService;
  }
  
}
