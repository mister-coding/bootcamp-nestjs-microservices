import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('list-all')
  async getUsers() {
    const data = await this.userService.getUsers();
    return {
      data,
      message: 'get users success',
    };
  }
}
