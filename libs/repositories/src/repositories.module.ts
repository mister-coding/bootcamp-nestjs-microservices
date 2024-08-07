import { Global, Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { UserRepository } from './repos/user.repository';
import { PrismaModule } from '@app/prisma';
import { ProductRepository } from './repos/product.repository';
import { ShippingRepository } from './repos/shipping.repository';
import { OrderItemRepository } from './repos/order-item.repository';
import { MediaRepository } from './repos/media.repository';
import { NotificationRepository } from './repos/notification.repository';
import { OrderRepository } from './repos/order.repository';
import { PaymentRepository } from './repos/payment.repository';
import { StockRepository } from './repos/stock.repository';
import { StockHistoryRepository } from './repos/stock-history.repository';
import { ForgotPasswordRepository } from './repos/forgot-password.repository';

const repos = [
  RepositoriesService, 
  UserRepository, 
  ProductRepository,
  ShippingRepository,
  OrderItemRepository,
  OrderRepository,
  MediaRepository,
  NotificationRepository,
  PaymentRepository,
  StockRepository,
  StockHistoryRepository,
  ForgotPasswordRepository
];

@Global()
@Module({
  imports: [PrismaModule],
  providers: [...repos],
  exports: [...repos],
})
export class RepositoriesModule {}
