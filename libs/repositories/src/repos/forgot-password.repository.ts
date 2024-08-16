import { PrismaService } from '@app/prisma';
import { PrismaMongoService } from '@app/prisma/prisma-mongo.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ForgotPasswordRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.forgot_password;
  }

  async create(data: Prisma.forgot_passwordCreateInput) {
    const checkExistData = await this.table.findFirst({
      where: {
        email: data.email,
      },
    });

    if (checkExistData) checkExistData;

    return await this.table.create({
      data,
    });
  }

  async update(id: string, data: Prisma.forgot_passwordUpdateInput) {
    return await this.table.update({
      data: data,
      where: {
        id: id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.table.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findByToken(token: string) {
    return await this.table.findFirst({
      where: {
        token: token,
      },
    });
  }
}
