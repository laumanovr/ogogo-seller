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
      id: "",
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
    setSelectedTemplateOrProduct(item: any) {
      this.productTemplate.templateId =
        item.type === "template" ? item.product.id : "";
      this.productTemplate.id = item.type === "product" ? item.product.id : "";
      this.productTemplate.productName = item.product.productName;
      this.productTemplate.toArticle =
        item.product.toArticle || item.product.articleNumber;
      this.productTemplate.categoryId = item.product.categoryId;
      this.productTemplate.countOfProduct = item.product.countOfProduct;
      this.productTemplate.description = item.product.description;
      this.productTemplate.organizationId = item.product.ownerOrganizationId;
      this.productTemplate.photos = item.product.photos;
      this.productTemplate.price = item.product.price;
      this.productTemplate.productPriceType = item.product.priceType;
      this.productTemplate.productType = item.product.productType;
      this.productTemplate.videos = item.product.videos;
    },
    clearForm() {
      this.productTemplate.categoryId = "";
      this.productTemplate.countOfProduct = "";
      this.productTemplate.description = "";
      this.productTemplate.discount = 0;
      this.productTemplate.organizationId = "";
      this.productTemplate.photos = [];
      this.productTemplate.price = "";
      this.productTemplate.productName = "";
      this.productTemplate.properties = {};
      this.productTemplate.toArticle = "";
      this.productTemplate.videos = [];
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
