import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class StockRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.stock;
  }

  async findByProduct(product_id: string) {
    return await this.table.findFirst({
      where: {
        product_id,
      },
    });
  }

  async create(data: Prisma.stockCreateInput) {
    return await this.table.create({
      data,
    });
  }
  
}
