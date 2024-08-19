// Original file: proto/common/enums.proto

export const PaymentStatus = {
  UNPAID: 0,
  FAILED: 1,
  CANCEL: 2,
  PAID: 3,
} as const;

export type PaymentStatus =
  | 'UNPAID'
  | 0
  | 'FAILED'
  | 1
  | 'CANCEL'
  | 2
  | 'PAID'
  | 3

export type PaymentStatus__Output = typeof PaymentStatus[keyof typeof PaymentStatus]
