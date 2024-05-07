import { CategoryApiResponse } from "../api/category-api.types";
import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { ICategoryState } from "./category-store.types";
import { CategoryApi } from "../api/category.api";
import {
  CategoryPagedPayload,
  CategoryPagedResponse,
} from "../api/category-api.types";

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const categoryApi = new CategoryApi();

export const useCategoryStore = defineStore("categoryStore", {
  state: (): Partial<ICategoryState> => ({
    categories: [],
  }),
  getters: {},
  actions: {
    getAllCategories(): Promise<CategoryApiResponse> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        categoryApi
          .getCategories()
          .then((response) => {
            this.categories = response.result;
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
    getCategoriesPagedList(
      payload: CategoryPagedPayload
    ): Promise<CategoryPagedResponse> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        categoryApi
          .getCategoriesPagedList(payload)
          .then((response) => {
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
