import { PrismaMongoService } from '@app/prisma/prisma-mongo.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@db_prisma/mongo';

@Injectable()
export class MediaRepository {
  constructor(private prismaMongoService: PrismaMongoService) {}

  get table() {
    return this.prismaMongoService.media;
  }

  async create(data: Prisma.mediaCreateInput) {
    return await this.table.create({ data });
  }
}
