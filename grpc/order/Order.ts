// Original file: proto/order.proto

import type { User as _order_User, User__Output as _order_User__Output } from '../order/User';
import type { OrderItem as _order_OrderItem, OrderItem__Output as _order_OrderItem__Output } from '../order/OrderItem';

export interface Order {
  'id'?: (string);
  'userId'?: (string);
  'orderNo'?: (string);
  'amount'?: (number);
  'user'?: (_order_User | null);
  'orderItems'?: (_order_OrderItem)[];
}

export interface Order__Output {
  'id'?: (string);
  'userId'?: (string);
  'orderNo'?: (string);
  'amount'?: (number);
  'user'?: (_order_User__Output);
  'orderItems'?: (_order_OrderItem__Output)[];
}
