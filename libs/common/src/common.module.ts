import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CommonService } from './common.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response/response.interceptor';
import { CustomLoggerService } from './logger/custom-logger/custom-logger.service';
import { ConfigModule } from '@nestjs/config';
import setryConfig from 'config/sentry';
import { HttpLoggerMiddleware } from './middlewares/http-logger/http-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [setryConfig],
    }),
  ],
  providers: [
    CommonService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    CustomLoggerService,
  ],
  exports: [CommonService, CustomLoggerService],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }

  static initSentry(): DynamicModule {
    setryConfig().init();
    return {
      module: CommonModule,
      providers: [CommonService, CustomLoggerService],
      exports: [CommonService, CustomLoggerService],
    };
  }
}
