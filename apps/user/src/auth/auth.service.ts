import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { RepositoriesService } from '@app/repositories';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private repos: RepositoriesService,
    private jwtService: JwtService,
  ) {}

  //Register new User
  async register(data: RegisterDto) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);
    data.password = hashPassword;
    const checkUser = await this.repos.user.getUserByEmail(data.email);
    if (checkUser) {
      throw new BadRequestException('User already exists');
    }
    try {
      const createUser = await this.repos.user.createUser(data);
      if (createUser) {
        return true;
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  //Login User
  async login(data: LoginDto) {
    const checkUser = await this.repos.user.getUserByEmail(data.email);
    if (!checkUser) {
      throw new BadRequestException('User email not found');
    }
    const isMatch = await bcrypt.compare(data.password, checkUser.password);
    if (!isMatch) {
      throw new BadRequestException('User password not match');
    }
    const payload = {
      id: checkUser.id,
      name: checkUser.name,
      email: checkUser.email,
      userLevel: checkUser.user_level,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  // Get user profile
  async profile(id: string) {
    return await this.repos.user.getUserById(id);
  }

  // Send email
  async sendForgotPasswordEmail(email: string) {
    const checkUser = await this.repos.user.getUserByEmail(email);
    if (!checkUser) {
      throw new BadRequestException('User email not found');
    }

    const expired_at = dayjs().add(1, 'day').toDate();

    const token = await this.jwtService.signAsync({
      email: email,
    });
    const checkForgotPassword =
      await this.repos.forgotPassword.findByEmail(email);

    if (checkForgotPassword) {
      return await this.repos.forgotPassword.update(checkForgotPassword.id, {
        token: token,
        expired_at: expired_at,
      });
    }

    return await this.repos.forgotPassword.create({
      email: email,
      token: token,
      expired_at: expired_at,
    });
  }
}
