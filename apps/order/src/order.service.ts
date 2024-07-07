import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  getHello(): string {
    return 'Order services!';
  }
}
