import { defineStore } from "pinia";
import type { IAlert, AlertItem } from "./index.types";
import { v4 as uuid } from "uuid";
export const useAlertStore = defineStore("alert", {
  state: (): IAlert =>
    <IAlert>{
      items: [],
    },
  getters: {
    getAlertItems(): AlertItem[] {
      return this.items;
    },
  },
  actions: {
    showSuccess(message: string) {
      this.items.push({
        id: uuid(),
        title: message,
        type: "success",
        timeout: 1800,
      });
    },
    showError(message: string) {
      this.items.push({
        id: uuid(),
        title: message,
        type: "error",
        timeout: 2500,
      });
    },
    showInfo(message: string) {
      this.items.push({
        id: uuid(),
        title: message,
        type: "info",
        timeout: 1800,
      });
    },
    showWarning(message: string) {
      this.items.push({
        id: uuid(),
        title: message,
        type: "warning",
        timeout: 2500,
      });
    },
    closeAlert(id: string) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
});
