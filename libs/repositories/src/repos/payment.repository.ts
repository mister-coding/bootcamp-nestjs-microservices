import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.payment;
  }

  async getPaymentById(id: string) {
    return await this.table.findFirst({
      where: {
        id: id,
      },
      include:{
        order:{
          include:{
            user: true
          }
        }
      }
    });
  }

  async updatePaymentById(id: string, data: Prisma.paymentUpdateInput) {
    return await this.table.update({
      data: data,
      where: {
        id: id,
      },
    });
  }
}
