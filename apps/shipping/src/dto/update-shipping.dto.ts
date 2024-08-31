import { ApiProperty } from '@nestjs/swagger';
import { shipping_status } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

export class UpdateShippingDto {
  @ApiProperty({ example: 'Menggunakan buble wrap' })
  @IsString()
  @IsOptional()
  adm_notes: string;

  @ApiProperty({ example: '123123123123' })
  @IsString()
  @IsOptional()
  shipping_no: string;

  @ApiProperty({ example: '123123' })
  @IsString()
  @IsOptional()
  courier_phone: string;

  @ApiProperty({ example: 'Jhon' })
  @IsString()
  @IsOptional()
  courier_name: string;

  @ApiProperty({ enum: shipping_status, default: shipping_status.Pending})
  @IsString()
  shipping_status: shipping_status
}
