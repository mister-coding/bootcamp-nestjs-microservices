import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, stock_history_type } from '@prisma/client';

@Injectable()
export class StockHistoryRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.stock_history;
  }

  async create(data: Prisma.stock_historyCreateInput) {
    const createHistory = await this.table.create({
      data,
    });

    if (createHistory) {
      const stock = await this.prismaService.stock.findFirst({
        where: {
          id: data.stock_id,
        },
      });
      if (data.history_type == stock_history_type.Input) {
        await this.prismaService.stock.update({
          data: {
            stock: stock.stock + data.amount,
          },
          where: {
            id: stock.id,
          },
        });
      } else if (data.history_type == stock_history_type.OutSales) {
        await this.prismaService.stock.update({
          data: {
            stock: stock.stock - data.amount,
          },
          where: {
            id: stock.id,
          },
        });
      } else if (data.history_type == stock_history_type.Reject) {
        await this.prismaService.stock.update({
          data: {
            stock: stock.stock - data.amount,
          },
          where: {
            id: stock.id,
          },
        });
      }
    }
    return createHistory;
  }
}
