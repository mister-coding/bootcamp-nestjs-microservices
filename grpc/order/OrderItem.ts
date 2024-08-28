// Original file: proto/order.proto

import type { Product as _order_Product, Product__Output as _order_Product__Output } from '../order/Product';

export interface OrderItem {
  'id'?: (string);
  'orderId'?: (string);
  'productId'?: (string);
  'qty'?: (number);
  'productPrice'?: (number);
  'product'?: (_order_Product | null);
}

export interface OrderItem__Output {
  'id'?: (string);
  'orderId'?: (string);
  'productId'?: (string);
  'qty'?: (number);
  'productPrice'?: (number);
  'product'?: (_order_Product__Output);
}
