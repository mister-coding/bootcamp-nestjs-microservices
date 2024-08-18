import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateAdminProductDto implements Prisma.productCreateInput {
  @ApiProperty({ example: 'Jeruk' })
  @IsString()
  product_name: string;

  slug: string;

  @ApiProperty({ example: 'Jeruk manis' })
  @IsString()
  description: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  price?: number;

  @ApiProperty({ example: '66c1574c1560f6e6d335c344' })
  product_image_id?: string;
  
  @ApiProperty({ example: 'abc.png' })
  product_image?: string;


  is_active?: boolean;

  created_by_id?: string;
  created_by: Prisma.userCreateNestedOneWithoutProductInput;
}
