// Original file: proto/shipping.proto

import type { ShippingStatus as _common_ShippingStatus, ShippingStatus__Output as _common_ShippingStatus__Output } from '../common/ShippingStatus';

export interface Shipping {
  'id'?: (string);
  'orderId'?: (string);
  'receiveName'?: (string);
  'receiveAddress'?: (string);
  'receivePhone'?: (string);
  'shippingStatus'?: (_common_ShippingStatus);
}

export interface Shipping__Output {
  'id'?: (string);
  'orderId'?: (string);
  'receiveName'?: (string);
  'receiveAddress'?: (string);
  'receivePhone'?: (string);
  'shippingStatus'?: (_common_ShippingStatus__Output);
}
