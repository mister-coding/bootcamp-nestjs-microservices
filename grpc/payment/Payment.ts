// Original file: proto/payment.proto

import type { PaymentStatus as _common_PaymentStatus, PaymentStatus__Output as _common_PaymentStatus__Output } from '../common/PaymentStatus';
import type { PaymentMethod as _common_PaymentMethod, PaymentMethod__Output as _common_PaymentMethod__Output } from '../common/PaymentMethod';

export interface Payment {
  'id'?: (string);
  'orderId'?: (string);
  'amount'?: (number);
  'paymentStatus'?: (_common_PaymentStatus);
  'paymentMethod'?: (_common_PaymentMethod);
}

export interface Payment__Output {
  'id'?: (string);
  'orderId'?: (string);
  'amount'?: (number);
  'paymentStatus'?: (_common_PaymentStatus__Output);
  'paymentMethod'?: (_common_PaymentMethod__Output);
}
