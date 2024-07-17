import { CategoryApiResponse } from "../api/category-api.types";
import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { ICategoryState } from "./category-store.types";
import { CategoryApi } from "../api/category.api";
import {
  CategoryPagedPayload,
  CategoryPagedResponse,
  CategoryWithPropertiesResponse,
} from "../api/category-api.types";

// TODO: clear default alert store actions
// TODO: remove global loader and set local loader

const loaderStore = useLoaderStore();
const alertStore = useAlertStore();
const categoryApi = new CategoryApi();

// TODO: store name already contains word "store". remove it
export const useCategoryStore = defineStore("categoryStore", {
  state: (): Partial<ICategoryState> => ({
    categories: [],
    categoryUrls: [],
    pagedCategories: [],
  }),
  getters: {
    getPagedCategories(): any {
      return this.pagedCategories;
    },
  },
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
            this.pagedCategories = response.items;
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err.message);
            loaderStore.setLoaderState(false);
            reject(err);
          });
      });
    },
    getCategoryWithPropertiesById(
      id: string
    ): Promise<CategoryWithPropertiesResponse> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        categoryApi
          .getCategoryById(id)
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
    saveSelectedCategoryPath(categoryPathes: any) {
      this.categoryUrls = categoryPathes;
    },
  },
});
