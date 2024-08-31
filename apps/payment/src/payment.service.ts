import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentConfirmationDto } from './dto/payment-confirmation.dto';
import { RepositoriesService } from '@app/repositories';
import { services } from 'constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { broker } from 'constant/broker';
import { PaymentConfirmationData } from 'types/notification';
import { UpdatePaymentStatusDto } from './dto/update-payment-status.dto';

@Injectable()
export class PaymentService {
  constructor(
    private repos: RepositoriesService,
    @Inject(services.NOTIF_SERVICE) private client: ClientProxy,
    @Inject(services.STOCK_SERVICE) private clientStock: ClientProxy,
  ) {}

  getHello(): string {
    return 'Payment services!';
  }

  async paymentConfirmation(data: PaymentConfirmationDto) {
    const payment = await this.repos.payment.getPaymentById(data.payment_id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    const update = await this.repos.payment.updatePaymentById(data.payment_id, {
      payment_image_id: data.payment_image_id,
      payment_image: data.payment_image,
      notes: data.notes,
    });
    const payload: PaymentConfirmationData = {
      payment_id: update.id,
    };
    this.client.emit(broker.mail.PAYMENT_CONFIRMATION, payload);
    return update;
  }

  async updatePaymentStatus(data: UpdatePaymentStatusDto) {
    const payment = await this.repos.payment.getPaymentById(data.payment_id);
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    const update = await this.repos.payment.updatePaymentById(data.payment_id, {
      payment_status: data.payment_status,
    });
    const payload: PaymentConfirmationData = {
      payment_id: update.id,
    };
    if (data.payment_status == 'Paid') {
      this.client.emit(broker.mail.PAYMENT_STATUS, payload);
    }else if(data.payment_status == 'Cancel'){
      this.clientStock.emit(broker.stock.RETURN_SALES_STOCK, {order_id:payment.order_id});
    }
    return update;
  }
}
