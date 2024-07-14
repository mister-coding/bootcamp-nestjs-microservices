import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.stock;
  }

}
