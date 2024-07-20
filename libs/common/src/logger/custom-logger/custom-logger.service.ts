import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {

  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {}

  verbose(message: any, ...optionalParams: any[]) {}
  
  fatal(message: any, ...optionalParams: any[]) {}
  
}
