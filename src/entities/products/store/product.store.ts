import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { IProductState } from "./product-store.types";
import { ProductApi } from "../api/product.api";
import {
  ProductPayload,
  ProductApiResponse,
  ProductImageResponse,
} from "../api/product-api.types";
import { ProductTemplateEntity } from "../model/types";
const productApi = new ProductApi();
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const useProductStore = defineStore("productStore", {
  state: (): Partial<IProductState> => ({
    products: [],
    productTemplate: {
      toArticle: "",
      productName: "",
      description: "",
      categoryId: "",
      price: "",
      discount: 0,
      organizationId: "",
      productType: 0,
      productPriceType: 0,
      photos: [],
      videos: [],
      templateId: "",
      countOfProduct: "",
      isSaveAsDraft: false,
      properties: {},
    },
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
    getExactProductById(id: string) {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        productApi
          .getProductById(id)
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
    setSelectedTemplate(template: any) {
      this.productTemplate.productName = template.productName;
      this.productTemplate.toArticle = template.articleNumber;
      this.productTemplate.templateId = template.id;
    },
    uploadFile(file: Blob): Promise<ProductImageResponse> {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "0");
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        productApi
          .uploadFile(formData)
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
    createProduct(payload: ProductTemplateEntity) {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        productApi
          .createProduct(payload)
          .then((response) => {
            loaderStore.setLoaderState(false);
            alertStore.showSuccess("Успешно добавлено!");
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
