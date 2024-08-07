import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RepositoriesModule } from '@app/repositories';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PrismaModule } from '@app/prisma';
import { CommonModule } from '@app/common';
import natsConfig from 'config/nats';
import { services } from 'constant/services';
import { AuthModule } from './auth/auth.module';
import { AuthModule as LibAuthModule } from '@app/auth';

@Module({
  imports: [
    LibAuthModule,
    CommonModule.initSentry(),
    PrismaModule,
    RepositoriesModule,
    ClientsModule.register([
      {
        name: services.NOTIF_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: natsConfig().servers,
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
