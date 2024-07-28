import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonService } from '@app/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private common: CommonService,
  ) {}

  @Get()
  getHello() {
    return {
      message: this.userService.getHello()
    };
  }
}
