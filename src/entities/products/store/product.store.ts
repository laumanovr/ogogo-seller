import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { IProductState } from "./product-store.types";
import { ProductApi } from "../api/product.api";
import { ProductPayload, ProductApiResponse } from "../api/product-api.types";
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
      price: 0,
      discount: 0,
      organizationId: "",
      productType: 0,
      productPriceType: 0,
      photos: [],
      videos: [],
      templateId: "",
      countOfProduct: 0,
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
    saveSelectedTemplate(template: any) {
      this.productTemplate.productName = template.productName;
      this.productTemplate.toArticle = template.articleNumber;
      this.productTemplate.photos.push(template.iconBase64);
      this.productTemplate.templateId = template.id;
    },
  },
});
