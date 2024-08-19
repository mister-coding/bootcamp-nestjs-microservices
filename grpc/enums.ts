import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition } from '@grpc/proto-loader';


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
}

