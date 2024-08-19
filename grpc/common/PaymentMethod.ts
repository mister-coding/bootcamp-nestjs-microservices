// Original file: proto/common/enums.proto

export const PaymentMethod = {
  BANK_TRANSFER: 0,
  CASH: 1,
  EWALLET: 2,
} as const;

export type PaymentMethod =
  | 'BANK_TRANSFER'
  | 0
  | 'CASH'
  | 1
  | 'EWALLET'
  | 2

export type PaymentMethod__Output = typeof PaymentMethod[keyof typeof PaymentMethod]
