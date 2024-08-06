import { OrderApiResponse } from "./../api/order-api.types";
import { OrderEntity, OrderPayload } from "../";
import { defineStore } from "pinia";
import { IOrderState } from "./order-store.types";
import { OrderApi } from "../api/order.api";

const orderApi = new OrderApi();

export const useOrderStore = defineStore("order", {
  state: (): Partial<IOrderState> => ({
    orders: [],
    isOrderExist: false,
    hasOrders: false,
    totalItems: 0,
  }),
  getters: {
    getOrders(): OrderEntity[] {
      return this.orders;
    },
    getIsOrderExist(): boolean {
      return this.isOrderExist;
    },
    getHasOrders(): boolean {
      return this.hasOrders;
    },
    getTotalItems(): number {
      return this.totalItems;
    },
  },
  actions: {
    getAllOrders(payload: OrderPayload): Promise<OrderApiResponse> {
      return new Promise((resolve, reject) => {
        orderApi
          .getOrders(payload)
          .then((response) => {
            this.orders = response.result.items;
            this.isOrderExist = Boolean(response.result.totalPages);
            this.hasOrders = Boolean(response.result.items.length);
            this.totalItems = response.result.totalCount;
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
});
