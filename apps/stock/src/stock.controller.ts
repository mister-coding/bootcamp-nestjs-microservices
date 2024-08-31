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

@ApiTags('Stock')
@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

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

}
