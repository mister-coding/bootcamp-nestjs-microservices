import { RepositoriesService } from '@app/repositories';
import { UserRepository } from '@app/repositories/repos/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { user_level } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private repo: RepositoriesService,
    @Inject('NOTIF_SERVICE') private client: ClientProxy,
  ) {}

  getHello(): string {
    this.client.emit('AUTH_NOTIFICATION', { name: 'John doe testing' });
    return 'User services!!';
  }

  async getUsers() {
    return await this.repo.user.getAllUsers();
  }
  
}
