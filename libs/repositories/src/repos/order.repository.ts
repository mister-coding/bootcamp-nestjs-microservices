import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.order;
  }

}
