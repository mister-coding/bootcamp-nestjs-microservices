import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { AuthModule } from '@app/auth';
import { CommonModule } from '@app/common';
import { RepositoriesModule } from '@app/repositories';

@Module({
  imports: [
    AuthModule,
    CommonModule.initSentry(),
    RepositoriesModule,
  ],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
