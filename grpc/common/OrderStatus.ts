// Original file: proto/common/enums.proto

export const OrderStatus = {
  PENDING: 0,
  ON_PROCESS: 1,
  FAILED: 2,
  CANCEL: 3,
  DONE: 4,
} as const;

export type OrderStatus =
  | 'PENDING'
  | 0
  | 'ON_PROCESS'
  | 1
  | 'FAILED'
  | 2
  | 'CANCEL'
  | 3
  | 'DONE'
  | 4

export type OrderStatus__Output = typeof OrderStatus[keyof typeof OrderStatus]
