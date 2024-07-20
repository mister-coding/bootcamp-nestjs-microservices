import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RepositoriesModule } from '@app/repositories';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '@app/common/interceptors/response/response.interceptor';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule,
    RepositoriesModule,
    PrismaModule,
    ClientsModule.register([
      {
        name: 'NOTIF_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class UserModule {}
