import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import { RepositoriesService } from '@app/repositories';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';
import { ResetPasswordDto } from './dto/reset-password-dto';
import { ClientProxy } from '@nestjs/microservices';
import { services } from 'constant/services';
import { broker } from 'constant/broker';
import { NOTIFICATION_AUTH } from 'types/notification';

@Injectable()
export class AuthService {
  constructor(
    private repos: RepositoriesService,
    private jwtService: JwtService,
    @Inject(services.NOTIF_SERVICE) private client: ClientProxy,
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
      const updateForgotPassword = await this.repos.forgotPassword.update(
        checkForgotPassword.id,
        {
          token: token,
          expired_at: expired_at,
        },
      );

      const notificationPayload : NOTIFICATION_AUTH = {
        notifType: 'MAIL_SEND_FORGOT_PASSWORD',
        data: {
          name: checkUser.name,
          email: updateForgotPassword.email,
          token: updateForgotPassword.token
        }
      }

      this.client.emit(broker.mail.AUTH_NOTIFICATION, notificationPayload);

      return updateForgotPassword;
    }

    const createForgotPassword = await this.repos.forgotPassword.create({
      email: email,
      token: token,
      expired_at: expired_at,
    });
    

    const notificationPayload : NOTIFICATION_AUTH = {
      notifType: 'MAIL_SEND_FORGOT_PASSWORD',
      data: {
        name: checkUser.name,
        email: createForgotPassword.email,
        token: createForgotPassword.token
      }
    }

    this.client.emit(broker.mail.AUTH_NOTIFICATION, notificationPayload);

    return createForgotPassword;
  }

  //Check token expired
  async checkTokenEpired(forgotPasswordToken: string) {
    const checkToken =
      await this.repos.forgotPassword.findByToken(forgotPasswordToken);

    if (!checkToken) throw new BadRequestException('Token not found');

    if (checkToken.expired_at.getTime() < dayjs().toDate().getTime())
      throw new BadRequestException('Token is expired');

    const user = await this.repos.user.getUserByEmail(checkToken.email);

    if (user) delete user.password;

    return {
      ...user,
      token: checkToken.token,
    };
  }

  async resetPassword(data: ResetPasswordDto) {
    const checkToken = await this.repos.forgotPassword.findByToken(data.token);

    if (!checkToken) throw new BadRequestException('Token not found');

    if (checkToken.expired_at.getTime() < dayjs().toDate().getTime())
      throw new BadRequestException('Token is expired');

    const user = await this.repos.user.getUserByEmail(checkToken.email);
    if (!user) throw new BadRequestException('User not found');

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);

    const updatePassword = await this.repos.user.updateUser(user.id, {
      password: hashPassword,
    });

    if (updatePassword) {
      const notificationPayload : NOTIFICATION_AUTH = {
        notifType: 'MAIL_RESET_PASSWORD_SUCCESS',
        data: {
          name: user.name,
          email: user.email
        }
      }

      this.client.emit(broker.mail.AUTH_NOTIFICATION, notificationPayload);
      return true;
    };

    throw new InternalServerErrorException();
  }
}
