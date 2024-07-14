import { UserRepository } from '@app/repositories/repos/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { user_level } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    @Inject("NOTIF_SERVICE") private client: ClientProxy
  ) {}

  getHello(): string {
    this.client.emit("TEST_USER",{name:"John doe testing"})
    return 'User services';
  }

  async getUsers(){
    return await this.userRepo.getUserByCustom({
      user_level: user_level.Member,
      email: "email"
    })
  }

}
