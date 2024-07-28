import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, user_level } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  get table() {
    return this.prismaService.user;
  }

  async getAllUsers() {
    return await this.table.findMany();
  }

  async getUserByEmail(email: string) {
    return await this.table.findFirst({
      where: {
        email: email,
      },
    });
  }

  async getUserById(id: string) {
    return await this.table.findFirst({
      where: {
        id: id,
      },
    });
  }

  async getUserByUserLevel(level: user_level) {
    return await this.table.findMany({
      where: {
        user_level: level,
      },
    });
  }

  //Create User
  async createUser(data: Prisma.userCreateInput) {
    return await this.table.create({
      data: data,
    });
  }

  async getUserByCustom(where: Prisma.userWhereInput) {
    return await this.table.findMany({
      where: where,
    });
  }
}
