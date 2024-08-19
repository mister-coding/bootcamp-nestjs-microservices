import { ApiProperty } from '@nestjs/swagger';
import { payment_method } from '@prisma/client';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ShippingDto {
  @ApiProperty({ example: 'Jalan jakarta no 123' })
  receive_address: string;

  @ApiProperty({ example: 'abc@gmail.com' })
  receive_email: string;

  @ApiProperty({ example: 'John' })
  receive_name: string;

  @ApiProperty({ example: '12344567' })
  receive_phone: string;
}

class PaymentDto {
  @ApiProperty({ enum: payment_method, default: payment_method.Cash })
  payment_method: payment_method;
}

class OrderItemDto {
  order_id: string;

  @ApiProperty()
  @IsString()
  product_id: string;

  amount: number;

  product_price: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  qty: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'payment' })
  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;

  @ApiProperty({ description: 'shipping' })
  @ValidateNested()
  @Type(() => ShippingDto)
  shipping: ShippingDto;

  @ApiProperty({ example: 'Warna orange' })
  notes: string;

  @ApiProperty({ type: () => [OrderItemDto] })
  order_item: OrderItemDto[];

  user_id: string;

  amount: number;
}
