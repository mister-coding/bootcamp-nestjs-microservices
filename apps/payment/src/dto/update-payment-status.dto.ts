import { ApiProperty } from '@nestjs/swagger';
import { payment_status } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';

export class UpdatePaymentStatusDto {
  @ApiProperty({ enum: payment_status, default: payment_status.Unpaid })
  @IsString()
  payment_status: payment_status;

  @ApiProperty()
  @IsUUID()
  payment_id: string;
}
