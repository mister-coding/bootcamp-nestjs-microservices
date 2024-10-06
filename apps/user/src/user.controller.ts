import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonService } from '@app/common';
import { ApiTags } from '@nestjs/swagger';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';

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

  @GrpcMethod('UserService', 'FindByEmail')
  FindByEmail(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>): any {
    const items = [
      { id: 1, name: 'John', email:"john@gmail.coms" }
    ];
    return items.find(({ email }) => email === data.email);
  }
  
}
