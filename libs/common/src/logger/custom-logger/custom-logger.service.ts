import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';

@Injectable()
export class CustomLoggerService extends ConsoleLogger {


  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
    Sentry.withScope((scope) => {
      scope.setLevel('log');
      Sentry.captureMessage(message, 'log');
    });
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, optionalParams);
    Sentry.withScope((scope) => {
      scope.setLevel('error');
      // scope.setContext('Product', {
      //   product: 'product error page',
      // });
      Sentry.captureMessage(message, 'error');
    });
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {

  }

  verbose(message: any, ...optionalParams: any[]) {

  }
  
  fatal(message: any, ...optionalParams: any[]) {

  }
  
}
