import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CommonService } from '@app/common';
import { ApiTags } from '@nestjs/swagger';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { UserRepository } from '@app/repositories/repos/user.repository';
import { Observable, of } from 'rxjs';
import { User } from 'grpc/user.service';

@ApiTags('Users')
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private common: CommonService,
    private userRepo: UserRepository
  ) {}

  @Get()
  getHello() {
    return {
      message: this.userService.getHello()
    };
  }

  @GrpcMethod('UserService', 'FindByEmail')
  async indByEmail(data: any, metadata: Metadata, call: ServerUnaryCall<any, any>) {
    const user = await this.userRepo.getUserByEmail(data.email);
    return user;
  }
  
}
