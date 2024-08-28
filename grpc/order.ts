import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';

import type { OrderServiceClient as _order_OrderServiceClient, OrderServiceDefinition as _order_OrderServiceDefinition } from './order/OrderService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  common: {
    OrderStatus: EnumTypeDefinition
    PaymentMethod: EnumTypeDefinition
    PaymentStatus: EnumTypeDefinition
    ShippingStatus: EnumTypeDefinition
  }
  order: {
    GetOrderRequest: MessageTypeDefinition
    GetOrderResponse: MessageTypeDefinition
    Order: MessageTypeDefinition
    OrderItem: MessageTypeDefinition
    OrderService: SubtypeConstructor<typeof grpc.Client, _order_OrderServiceClient> & { service: _order_OrderServiceDefinition }
    Product: MessageTypeDefinition
    User: MessageTypeDefinition
  }
  payment: {
    Payment: MessageTypeDefinition
  }
  product: {
    Product: MessageTypeDefinition
  }
  shipping: {
    Shipping: MessageTypeDefinition
  }
  user: {
    User: MessageTypeDefinition
  }
}

