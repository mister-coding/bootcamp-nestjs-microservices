// Original file: proto/order.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetOrderRequest as _order_GetOrderRequest, GetOrderRequest__Output as _order_GetOrderRequest__Output } from '../order/GetOrderRequest';
import type { GetOrderResponse as _order_GetOrderResponse, GetOrderResponse__Output as _order_GetOrderResponse__Output } from '../order/GetOrderResponse';

export interface OrderServiceClient extends grpc.Client {
  GetOrder(argument: _order_GetOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_order_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  GetOrder(argument: _order_GetOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_order_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  GetOrder(argument: _order_GetOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_order_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  GetOrder(argument: _order_GetOrderRequest, callback: grpc.requestCallback<_order_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  getOrder(argument: _order_GetOrderRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_order_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  getOrder(argument: _order_GetOrderRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_order_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  getOrder(argument: _order_GetOrderRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_order_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  getOrder(argument: _order_GetOrderRequest, callback: grpc.requestCallback<_order_GetOrderResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface OrderServiceHandlers extends grpc.UntypedServiceImplementation {
  GetOrder: grpc.handleUnaryCall<_order_GetOrderRequest__Output, _order_GetOrderResponse>;
  
}

export interface OrderServiceDefinition extends grpc.ServiceDefinition {
  GetOrder: MethodDefinition<_order_GetOrderRequest, _order_GetOrderResponse, _order_GetOrderRequest__Output, _order_GetOrderResponse__Output>
}
