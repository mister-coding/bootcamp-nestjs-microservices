import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {

  @ApiProperty()
  @IsString()
  @MinLength(20)
  token: string;

  @ApiProperty({ example: '123445678' })
  @IsString()
  @MinLength(6)
  password: string;
}
