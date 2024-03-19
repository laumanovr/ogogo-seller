import { defineStore } from "pinia";

import type { IAlert } from "./index.types";

export const useAlertStore = defineStore("alert", {
  state: (): IAlert =>
    <IAlert>{
      successMessage: null,
      errorMessage: null,
      infoMessage: null,
    },
  getters: {},
  actions: {
    showSuccess(message: string) {
      this.successMessage = message;
      this.clearAlerts("successMessage");
    },
    showError(message: string) {
      this.errorMessage = message;
      this.clearAlerts("errorMessage");
    },
    showInfo(message: string) {
      this.infoMessage = message;
      this.clearAlerts("infoMessage");
    },
    clearAlerts(this: Record<string, any>, field: string | null = null): void {
      setTimeout(() => {
        if (field && typeof this[field] !== "undefined") {
          this[field] = null;
        }
      }, 800);
    },
  },
});
