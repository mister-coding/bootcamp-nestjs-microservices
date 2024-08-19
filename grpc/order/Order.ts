// Original file: proto/order.proto

import type { User as _user_User, User__Output as _user_User__Output } from '../user/User';
import type { OrderItem as _order_OrderItem, OrderItem__Output as _order_OrderItem__Output } from '../order/OrderItem';
import type { Shipping as _shipping_Shipping, Shipping__Output as _shipping_Shipping__Output } from '../shipping/Shipping';
import type { Payment as _payment_Payment, Payment__Output as _payment_Payment__Output } from '../payment/Payment';

export interface Order {
  'id'?: (string);
  'userId'?: (string);
  'orderNo'?: (string);
  'amount'?: (number);
  'user'?: (_user_User | null);
  'orderItems'?: (_order_OrderItem)[];
  'shipping'?: (_shipping_Shipping)[];
  'payment'?: (_payment_Payment)[];
}

export interface Order__Output {
  'id'?: (string);
  'userId'?: (string);
  'orderNo'?: (string);
  'amount'?: (number);
  'user'?: (_user_User__Output);
  'orderItems'?: (_order_OrderItem__Output)[];
  'shipping'?: (_shipping_Shipping__Output)[];
  'payment'?: (_payment_Payment__Output)[];
}
