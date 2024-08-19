// Original file: proto/order.proto

import type { Product as _product_Product, Product__Output as _product_Product__Output } from '../product/Product';

export interface OrderItem {
  'id'?: (string);
  'orderId'?: (string);
  'productId'?: (string);
  'qty'?: (number);
  'productPrice'?: (number);
  'product'?: (_product_Product | null);
}

export interface OrderItem__Output {
  'id'?: (string);
  'orderId'?: (string);
  'productId'?: (string);
  'qty'?: (number);
  'productPrice'?: (number);
  'product'?: (_product_Product__Output);
}
