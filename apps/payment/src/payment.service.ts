import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PaymentConfirmationDto } from './dto/payment-confirmation.dto';
import { RepositoriesService } from '@app/repositories';
import { services } from 'constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { broker } from 'constant/broker';
import { PaymentConfirmationData } from 'types/notification';

@Injectable()
export class PaymentService {
  constructor(
    private repos: RepositoriesService,
    @Inject(services.NOTIF_SERVICE) private client: ClientProxy,
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
}
