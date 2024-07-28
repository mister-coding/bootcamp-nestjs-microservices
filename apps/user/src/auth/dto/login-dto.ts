import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123445678' })
  @IsString()
  @MinLength(6)
  password: string;
}
