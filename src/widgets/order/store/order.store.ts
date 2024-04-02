import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { IOrder } from "./order-store.types";
import { OrderApi } from "../api/order.api";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const orderApi = new OrderApi();

export const useOrderStore = defineStore("orderStore", {
  state: (): Partial<IOrder> => ({
    orders: [],
  }),
  getters: {},
  actions: {
    getAllOrders(payload) {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        orderApi
          .getOrders(payload)
          .then((response) => {
            debugger;
            this.orders = response.items;
            loaderStore.setLoaderState(false);
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err.message);
            loaderStore.setLoaderState(false);
            reject(err);
          });
      });
    },
  },
});
