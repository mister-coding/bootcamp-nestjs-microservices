import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { UserRepository } from './repos/user.repository';
import { PrismaModule } from '@app/prisma';
import { ProductRepository } from './repos/product.repository';
import { ShippingRepository } from './repos/shipping.repository';
import { OrderItemRepository } from './repos/order-item.repository';

const repos = [
  RepositoriesService, 
  UserRepository, 
  ProductRepository,
  ShippingRepository,
  OrderItemRepository
];

@Module({
  imports: [PrismaModule],
  providers: [...repos],
  exports: [...repos],
})
export class RepositoriesModule {}
