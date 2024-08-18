import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CommonModule } from '@app/common';
import { AdminProductModule } from './admin-product/admin-product.module';
import { RepositoriesModule } from '@app/repositories';
import { AuthModule } from '@app/auth';

@Module({
  imports: [
    AuthModule,
    CommonModule.initSentry(),
    RepositoriesModule,
    AdminProductModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
