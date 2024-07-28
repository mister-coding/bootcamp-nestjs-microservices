import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { RepositoriesService } from '@app/repositories';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private repos: RepositoriesService) {}

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

  async login(data: LoginDto) {
    const checkUser = await this.repos.user.getUserByEmail(data.email);
    if (!checkUser) {
      throw new BadRequestException('User email not found');
    }
    const isMatch = await bcrypt.compare(data.password, checkUser.password);
    if (!isMatch) {
      throw new BadRequestException('User password not match');
    }
    delete checkUser.password;
    return checkUser;
  }

  async profile() {}
}
