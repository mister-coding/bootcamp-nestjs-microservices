import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
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
    throw new HttpException("Test errorrrrrrrr",HttpStatus.BAD_REQUEST)
    // const data = await this.userService.getUsers();
    // return {
    //   data,
    //   message: 'List user success',
    // };
  }
}
