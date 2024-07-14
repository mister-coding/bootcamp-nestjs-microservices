import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RepositoriesModule } from '@app/repositories';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    RepositoriesModule,
    ClientsModule.register([
      {
        name:"NOTIF_SERVICE",
        transport: Transport.NATS,
        options:{
          servers:["nats://nats:4222"]
        }
      }
    ])
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
