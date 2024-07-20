import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomLoggerService } from '@app/common/logger/custom-logger/custom-logger.service';

@Controller()
export class UserController {

  private logger = new CustomLoggerService(UserController.name)
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @Get('list-all')
  async getUsers() {
    this.logger.error("SSSSSSSSSSSSS")
    throw new HttpException("Test errorrrrrrrr",HttpStatus.BAD_REQUEST)
    // const data = await this.userService.getUsers();
    // return {
    //   data,
    //   message: 'List user success',
    // };
  }
}
