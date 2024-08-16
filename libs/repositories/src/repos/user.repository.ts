import { PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, user_level } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  user_select: Prisma.userSelect = {
    id: true,
    name: true,
    email: true,
    avatar: true,
    user_level: true,
  };

  get table() {
    return this.prismaService.user;
  }

  async getAllUsers() {
    return await this.table.findMany({
      select: this.user_select,
    });
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
      select: this.user_select,
    });
  }

  async getUserByUserLevel(level: user_level) {
    return await this.table.findMany({
      where: {
        user_level: level,
      },
      select: this.user_select,
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

  //Update user
  async updateUser(id: string, data: Prisma.userUpdateInput) {
    return await this.table.update({
      where: {
        id: id,
      },
      data,
    });
  }
  
}
