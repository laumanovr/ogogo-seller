export interface OrderEntity {
  id: string;
  orderNumber: string;
  status: number;
  registrationDate: string;
  paymentType: number;
  count: number;
  price: number;
  priceUsd: number;
}
