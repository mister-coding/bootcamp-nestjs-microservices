import { Injectable } from '@nestjs/common';
import { MediaRepository } from './repos/media.repository';
import { UserRepository } from './repos/user.repository';
import { OrderRepository } from './repos/order.repository';
import { OrderItemRepository } from './repos/order-item.repository';
import { PaymentRepository } from './repos/payment.repository';
import { ProductRepository } from './repos/product.repository';
import { ShippingRepository } from './repos/shipping.repository';
import { StockRepository } from './repos/stock.repository';
import { StockHistoryRepository } from './repos/stock-history.repository';
import { NotificationRepository } from './repos/notification.repository';
import { ForgotPasswordRepository } from './repos/forgot-password.repository';

@Injectable()
export class RepositoriesService {
  constructor(
    private mediaRepo: MediaRepository,
    private userRepo: UserRepository,
    private orderRepo: OrderRepository,
    private orderItemRepo: OrderItemRepository,
    private paymentRepo: PaymentRepository,
    private productRepo: ProductRepository,
    private shippingRepo: ShippingRepository,
    private stockRepo: StockRepository,
    private stockHistoryRepo: StockHistoryRepository,
    private notificationRepo: NotificationRepository,
    private forgotPasswordRepository: ForgotPasswordRepository,
  ) {}

  // MongoDB
  get media() {
    return this.mediaRepo;
  }

  get user() {
    return this.userRepo;
  }

  get order() {
    return this.orderRepo;
  }

  get orderItem() {
    return this.orderItemRepo;
  }

  get payment() {
    return this.paymentRepo;
  }

  get product() {
    return this.productRepo;
  }

  get shipping() {
    return this.shippingRepo;
  }

  get stock() {
    return this.stockRepo;
  }

  get stockHistory() {
    return this.stockHistoryRepo;
  }

  get notification() {
    return this.notificationRepo;
  }

  get forgotPassword() {
    return this.forgotPasswordRepository;
  }
}
