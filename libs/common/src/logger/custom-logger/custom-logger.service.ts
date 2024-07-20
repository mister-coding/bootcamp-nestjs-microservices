import {
  ConsoleLogger,
  Injectable,
  Logger,
  LoggerService,
  LogLevel,
} from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  
//   constructor() {
//     super();
//   }

  log(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    super.log(message, ...optionalParams);
  }
  error(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
    super.error(message, optionalParams);
  }
  warn(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
  }
  debug(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
  }
  verbose(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
  }
  fatal(message: any, ...optionalParams: any[]) {
    // throw new Error('Method not implemented.');
  }
}
