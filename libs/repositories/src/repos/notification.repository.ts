import { PrismaMongoService } from '@app/prisma/prisma-mongo.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationRepository {
  constructor(private prismaMongoService: PrismaMongoService) {}

  get table() {
    return this.prismaMongoService.media;
  }


}
