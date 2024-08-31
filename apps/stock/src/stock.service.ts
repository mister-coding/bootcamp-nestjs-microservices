import { RepositoriesService } from '@app/repositories';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddStockDto } from './dto/add-stock.dto';
import { Prisma, stock, stock_history_type } from '@prisma/client';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';

@Injectable()
export class StockService {
  constructor(private repos: RepositoriesService) {}

  private logger = new CustomLoggerService();

  getHello(): string {
    return 'Hello World!';
  }

  async addStock(data: AddStockDto) {
    let stock = await this.repos.stock.findByProduct(data.product_id);
    if (!stock) {
      const stockPayload: Prisma.stockCreateInput = {
        stock: 0,
        product: {
          connect: {
            id: data.product_id,
          },
        },
      };
      stock = await this.repos.stock.create(stockPayload);
    }
    const stockHistory: Prisma.stock_historyCreateInput = {
      stock_id: stock.id,
      history_type: stock_history_type.Input,
      notes: data.notes,
      amount: data.amount,
      created_by: {
        connect: {
          id: data.user_id,
        },
      },
    };
    const createStock = await this.repos.stockHistory.create(stockHistory);
    return createStock;
  }

  async removeStock(data: AddStockDto) {
    let stock = await this.repos.stock.findByProduct(data.product_id);
    if (!stock) {
      const stockPayload: Prisma.stockCreateInput = {
        stock: 0,
        product: {
          connect: {
            id: data.product_id,
          },
        },
      };
      stock = await this.repos.stock.create(stockPayload);
    }
    const stockHistory: Prisma.stock_historyCreateInput = {
      stock_id: stock.id,
      history_type: stock_history_type.Reject,
      notes: data.notes,
      amount: data.amount,
      created_by: {
        connect: {
          id: data.user_id,
        },
      },
    };
    const createStock = await this.repos.stockHistory.create(stockHistory);
    return createStock;
  }

  async removeStockSales(data: AddStockDto) {
    let stock = await this.repos.stock.findByProduct(data.product_id);
    if (!stock) {
      const stockPayload: Prisma.stockCreateInput = {
        stock: 0,
        product: {
          connect: {
            id: data.product_id,
          },
        },
      };
      stock = await this.repos.stock.create(stockPayload);
    }
    const stockHistory: Prisma.stock_historyCreateInput = {
      stock_id: stock.id,
      history_type: stock_history_type.Reject,
      notes: data.notes,
      amount: data.amount,
      created_by: {
        connect: {
          id: data.user_id,
        },
      },
    };
    const createStock = await this.repos.stockHistory.create(stockHistory);
    return createStock;
  }
}
