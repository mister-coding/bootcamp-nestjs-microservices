import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { CustomLoggerService } from './logger/custom-logger/custom-logger.service';

@Module({
  providers: [
    CommonService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    CustomLoggerService
  ],
  exports: [
    CommonService,
    CustomLoggerService
  ],
})
export class CommonModule {}
