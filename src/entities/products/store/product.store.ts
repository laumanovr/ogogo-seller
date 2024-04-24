import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { IProductState } from "./product-store.types";
import { ProductApi } from "../api/product.api";
import {
  ProductPayload,
  ProductApiResponse,
  CategoryPayload,
  CategoryResponse,
} from "../api/product-api.types";
const productApi = new ProductApi();
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const useProductStore = defineStore("productStore", {
  state: (): Partial<IProductState> => ({
    products: [],
  }),
  getters: {},
  actions: {
    getAllProducts(payload: ProductPayload): Promise<ProductApiResponse> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        productApi
          .getProducts(payload)
          .then((response) => {
            this.products = response.result.items;
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
    getAllCategories(payload: CategoryPayload): Promise<CategoryResponse> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        productApi
          .getCategories(payload)
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
