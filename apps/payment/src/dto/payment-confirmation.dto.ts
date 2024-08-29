import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaymentConfirmationDto {
  @ApiProperty({ description: 'Payment ID' })
  @IsString()
  payment_id: string;

  @ApiProperty({ description: 'Payment Image(from media url)' })
  @IsString()
  payment_image: string;

  @ApiProperty({ description: 'Notes' })
  @IsString()
  @IsOptional()
  notes: string;

  @ApiProperty({ description: 'Payment Image ID(media id)' })
  @IsString()
  payment_image_id: string;
}
