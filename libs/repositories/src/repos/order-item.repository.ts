import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderItemRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.order_item;
  }

}
