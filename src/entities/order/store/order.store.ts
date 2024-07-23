import { OrderApiResponse } from "./../api/order-api.types";
import { OrderPayload } from "../";
import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { IOrderState } from "./order-store.types";
import { OrderApi } from "../api/order.api";

// TODO: clear default alert store actions
// TODO: remove global loader and set local loader

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const orderApi = new OrderApi();

export const useOrderStore = defineStore("order", {
  state: (): Partial<IOrderState> => ({
    orders: [],
    isOrderExist: false,
    hasOrders: false,
    totalItems: 0,
  }),
  getters: {
    getOrders(): any {
      return this.orders
    },
    getIsOrderExist(): any {
      return this.isOrderExist
    },
    getHasOrders(): any {
      return this.hasOrders
    },
    getTotalItems(): any {
      return this.totalItems
    }
  },
  actions: {
    getAllOrders(payload: OrderPayload): Promise<OrderApiResponse> {
      return new Promise((resolve, reject) => {
        // TODO: remove global loader and set local loader
        loaderStore.setLoaderState(true);
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
            // TODO: remove global alert
            alertStore.showError(err.message);
            reject(err);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
  },
});
