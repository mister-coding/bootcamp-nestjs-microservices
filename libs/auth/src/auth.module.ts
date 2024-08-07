import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import jwt from 'config/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwt().jwtToken,
      signOptions: { expiresIn: jwt().expiresIn },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
