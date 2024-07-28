import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Register user', description: 'Register new user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
    schema: {
      example: {
        data: true,
        message: 'success',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() data: RegisterDto) {
    return {
      data: await this.authService.register(data),
      message: 'Register new user',
    };
  }

  @ApiOperation({ summary: 'Login user', description: 'Login exists user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'check user exists or not',
    schema: {
      example: {
        data: {
          email: 'john@gmail.com',
          name: 'John',
        },
        message: 'success',
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: LoginDto) {
    return {
      data: await this.authService.login(data),
      message: 'Login user',
    };
  }
}
