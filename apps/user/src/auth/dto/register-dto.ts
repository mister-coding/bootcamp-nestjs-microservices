import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Min, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '0888112292' })
  @IsString()
  @MinLength(4)
  phone: string;

  @ApiProperty({ example: '123445678' })
  @IsString()
  @MinLength(6)
  password: string;
}
