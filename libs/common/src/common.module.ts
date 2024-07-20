import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CustomLoggerService } from './logger/custom-logger/custom-logger.service';
import { LoggerModule } from '@app/logger';

@Module({
  imports:[LoggerModule],
  providers: [CommonService, CustomLoggerService],
  exports: [CommonService,CustomLoggerService],
})
export class CommonModule {}
