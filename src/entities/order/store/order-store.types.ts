import { OrderEntity } from "../model/types";

export interface IOrderState {
  orders: OrderEntity[];
  isOrderExist: boolean;
  hasOrders: boolean;
  totalItems: number;
}
