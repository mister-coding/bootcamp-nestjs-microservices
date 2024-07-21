import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule.initSentry()
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
