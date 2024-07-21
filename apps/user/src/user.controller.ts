import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonService } from '@app/common';


@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private common: CommonService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('test-error')
  testError() {
    this.common.logger.error('Test Config error 2');
    // throw new HttpException("Testing filter",HttpStatus.BAD_REQUEST)
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
