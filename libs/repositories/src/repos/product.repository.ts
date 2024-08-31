import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as slug from 'slug';

@Injectable()
export class ProductRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.product;
  }

  async create(data: Prisma.productCreateInput) {
    data.slug = slug(data.product_name);
    return await this.table.create({ data });
  }

  async update(id: string, data: Prisma.productUpdateInput) {
    return await this.table.update({ data, where: { id } });
  }

  async findAll() {
    return await this.table.findMany({
      where: {
        deleted_at: null,
      },
      include: {
        stock: true,
      },
    });
  }

  async findAllActive() {
    return await this.table.findMany({
      where: {
        deleted_at: null,
        is_active: true,
      },
      include: {
        stock: true,
      },
    });
  }

  async findAllByUser(user_id: string) {
    return await this.table.findMany({
      where: {
        deleted_at: null,
        created_by_id: user_id,
      },
      include: {
        stock: true,
      },
    });
  }

  async findOneById(id: string) {
    return await this.table.findFirst({
      where: {
        id: id,
      },
      include: {
        stock: true,
      },
    });
  }

  async remove(id: string) {
    return await this.table.update({
      data: { deleted_at: new Date() },
      where: { id },
    });
  }
}
