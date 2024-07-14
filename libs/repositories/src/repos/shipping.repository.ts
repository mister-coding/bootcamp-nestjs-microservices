import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.shipping;
  }

}
