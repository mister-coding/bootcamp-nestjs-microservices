import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register-dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { AuthGuard } from '@app/auth/auth/auth.guard';
import { ResetPasswordDto } from './dto/reset-password-dto';

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

  @ApiOperation({ summary: 'Profile user', description: 'Get profile user' })
  @ApiBearerAuth('accessToken')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const user = await this.authService.profile(req.user.id);
    return {
      data: user,
      message: 'get profile success',
    };
  }

  @ApiOperation({
    summary: 'Send forgot password',
    description: 'Send forgot password via email',
  })
  @ApiParam({ name: 'email' })
  @HttpCode(HttpStatus.OK)
  @Get('sendForgotPasswordEmail/:email')
  async SendForgotPasswordEmail(@Param('email') email) {
    const token = await this.authService.sendForgotPasswordEmail(email);
    return {
      data: token,
      message: 'get profile success',
    };
  }

  @ApiOperation({
    summary: 'Check token expired',
    description: 'Check token expired or not',
  })
  @ApiQuery({ name: 'token' })
  @HttpCode(HttpStatus.OK)
  @Get('checkTokenEpired')
  async checkTokenEpired(@Query('token') token) {
    const check = await this.authService.checkTokenEpired(token);
    return {
      data: check,
      message: 'get profile success',
    };
  }

  @ApiOperation({
    summary: 'Check token expired',
    description: 'Check token expired or not',
  })
  @HttpCode(HttpStatus.OK)
  @Post('resetPassword')
  async resetPassword(@Body() data: ResetPasswordDto) {
    return {
      data: await this.authService.resetPassword(data),
      message: 'reset password success',
    };
  }
}
