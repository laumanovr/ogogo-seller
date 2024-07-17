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

// TODO: store name already contains word "store". remove it
export const useOrderStore = defineStore("orderStore", {
  state: (): Partial<IOrderState> => ({
    orders: [],
  }),
  // TODO: why no getters?
  getters: {},
  actions: {
    getAllOrders(payload: OrderPayload): Promise<OrderApiResponse> {
      return new Promise((resolve, reject) => {
        // TODO: remove global loader and set local loader
        loaderStore.setLoaderState(true);
        orderApi
          .getOrders(payload)
          .then((response) => {
            this.orders = response.result.items;
            // TODO: move to finally callback
            loaderStore.setLoaderState(false);
            resolve(response);
          })
          .catch((err) => {
            // TODO: remove global alert 
            alertStore.showError(err.message);
            // TODO: move to finally callback
            loaderStore.setLoaderState(false);
            reject(err);
          });
      });
    },
  },
});
