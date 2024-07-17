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
    // TODO: what if i want to add an alert with custom timeout?
    // TODO: where `is content` for the alert? 
    showSuccess(message: string) {
      // TODO: learn about factory pattern
      this.items.push({
        id: uuid(),
        title: message,
        type: "success",
        timeout: 1800, // TODO: what is there some const number? what does it mean? and why 1800 or 2500?
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
