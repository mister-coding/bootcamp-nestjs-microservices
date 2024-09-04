import { Module } from '@nestjs/common';
import { NatsService } from './nats.service';
import { CommonModule } from '@app/common';

@Module({
  imports:[CommonModule],
  providers: [NatsService],
  exports: [NatsService],
})
export class NatsModule {}
