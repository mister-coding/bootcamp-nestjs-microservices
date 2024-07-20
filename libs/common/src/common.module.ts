import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';

@Module({
  providers: [
    CommonService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    }
  ],
  exports: [
    CommonService
  ],
})
export class CommonModule {}
