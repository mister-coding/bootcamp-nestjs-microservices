import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddStockDto } from './dto/add-stock.dto';
import { AuthGuard } from '@app/auth/auth/auth.guard';
import { EventPattern } from '@nestjs/microservices';
import { broker } from 'constant/broker';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';

@ApiTags('Stock')
@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  private logger = new CustomLoggerService();

  @Get()
  getHello(): string {
    return this.stockService.getHello();
  }

  @ApiOperation({
    summary: 'Add Stock',
    description: 'Add stock (input stock)',
  })
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('add-stock')
  async addStock(@Body() data: AddStockDto, @Request() req) {
    data.user_id = req.user.id;
    const createStock = await this.stockService.addStock(data);

    return {
      data: createStock,
      message: 'create stock success',
    };
  }

  @ApiOperation({
    summary: 'Remove Stock',
    description: 'Remove stock (input stock)',
  })
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('remove-stock')
  async removeStock(@Body() data: AddStockDto, @Request() req) {
    data.user_id = req.user.id;
    const createStock = await this.stockService.removeStock(data);

    return {
      data: createStock,
      message: 'remove stock success',
    };
  }

  @EventPattern(broker.stock.SALES_STOCK)
  async salesStock(data: { order_id: string }) {
    this.logger.warn('Sales stock :', data);
    await this.stockService.removeStockSales(data.order_id);
  }

  @EventPattern(broker.stock.RETURN_SALES_STOCK)
  async returnStockSales(data: { order_id: string }) {
    this.logger.warn('Rerurn Sales stock :', data);
    await this.stockService.returnStockSales(data.order_id);
  }
}
