import { defineStore } from "pinia";
import type { ILoader } from "@/shared/store/loader/index.types";

export const useLoaderStore = defineStore("loader", {
  state: (): ILoader => ({
    isLoading: false,
  }),
  getters: {
    getLoadingState(): boolean {
      return this.isLoading;
    }
  },
  actions: {
    setLoaderState(status: boolean) {
      this.isLoading = status;
    },
  },
});
