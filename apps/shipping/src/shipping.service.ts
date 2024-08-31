import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { RepositoriesService } from '@app/repositories';
import { services } from 'constant/services';
import { ClientProxy } from '@nestjs/microservices';
import { broker } from 'constant/broker';
import { ShippingDataNotification } from 'types/notification';

@Injectable()
export class ShippingService {
  constructor(
    private repos: RepositoriesService,
    @Inject(services.NOTIF_SERVICE) private client: ClientProxy,
  ) {}
  getHello(): string {
    return 'Shipping services!';
  }

  async updateStatus(id: string, data: UpdateShippingDto) {
    const shipping = await this.repos.shipping.findById(id);
    if (!shipping) {
      throw new NotFoundException('Shipping not found');
    }
    const update = await this.repos.shipping.update(id, data);
    const payload: ShippingDataNotification = {
      shipping_id: update.id,
    };
    this.client.emit(broker.mail.SHIPPING_STATUS, payload);
    return update;
  }
}
