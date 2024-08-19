// Original file: proto/common/enums.proto

export const ShippingStatus = {
  PENDING: 0,
  DONE: 1,
  FAILED: 2,
} as const;

export type ShippingStatus =
  | 'PENDING'
  | 0
  | 'DONE'
  | 1
  | 'FAILED'
  | 2

export type ShippingStatus__Output = typeof ShippingStatus[keyof typeof ShippingStatus]
