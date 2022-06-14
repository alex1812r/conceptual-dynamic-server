export enum OrderStatusEnum {
  pending = 'pending',
  paid = 'paid',
  rejected = 'rejected'
}

export type OrderStatusType = keyof typeof OrderStatusEnum;