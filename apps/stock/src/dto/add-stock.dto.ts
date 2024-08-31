import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class AddStockDto {
  @ApiProperty()
  @IsString()
  product_id: string;

  @ApiProperty({example:100})
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'Stock produk import' })
  @IsString()
  @IsOptional()
  notes: string;

  user_id: string
}
