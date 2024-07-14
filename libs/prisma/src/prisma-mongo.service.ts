
import { PrismaClient } from '@db_prisma/mongo';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaMongoService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

   constructor() {
      super({
         log: [
            {
               emit: 'stdout',
               level: 'query',
            },
            {
               emit: 'stdout',
               level: 'error',
            },
            {
               emit: 'stdout',
               level: 'info',
            },
            {
               emit: 'stdout',
               level: 'warn',
            },
         ]
      })
   }
   async onModuleInit() {
      await this.$connect()
   }

   async onModuleDestroy() {
      await this.$disconnect()
   }

}
