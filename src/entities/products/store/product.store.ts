import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { IProductState } from "./product-store.types";
import { ProductApi } from "../api/product.api";
import {
  ProductPayload,
  ProductApiResponse,
  ProductImageResponse,
  ProductDetailApiResponse,
} from "../api/product-api.types";
import { ProductTemplateEntity } from "../model/types";

// TODO: clear default alert store actions
// TODO: remove global loader and set local loader

const productApi = new ProductApi();
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const useProductStore = defineStore("product", {
  state: (): Partial<IProductState> => ({
    products: [],
    hasProducts: false,
    hasStatusProducts: false,
    totalItems: 0,
    productTemplate: {
      id: "",
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
  getters: {
    getProducts(): any {
      return this.products;
    },
    getHasProducts(): any {
      return this.hasProducts;
    },
    getHasStatusProducts(): any {
      return this.hasStatusProducts;
    },
    getTotalItems(): any {
      return this.totalItems;
    },
    getProductTemplate(): any {
      return this.productTemplate
    },
    getValidationName(): any {
      return this.productTemplate.validationDetails?.fields?.name;
    },
    getValidationDescription(): any {
      return this.productTemplate.validationDetails?.fields?.description;
    },
    getValidationPrice(): any {
      return this.productTemplate.validationDetails?.fields?.price;
    },
    getValidationCount(): any {
      return this.productTemplate.validationDetails?.fields?.countofproduct;
    },
    getValidationFile(): any {
      return this.productTemplate.validationDetails?.files;
    },
  },
  actions: {
    getAllProducts(payload: ProductPayload): Promise<ProductApiResponse> {
      return new Promise((resolve, reject) => {
        // TODO: remove global loader and set local loader
        loaderStore.setLoaderState(true);
        productApi
          .getProducts(payload)
          .then((response) => {
            this.products = response.result.items;
            this.hasProducts = Boolean(response.result.totalPages);
            this.hasStatusProducts = Boolean(response.result.items.length);
            this.totalItems = response.result.totalCount;
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
    getExactProductById(id: string): Promise<ProductDetailApiResponse> {
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
      // TODO: learn about factory pattern
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
      this.productTemplate.validationDetails = item.product.validationDetails;
      this.productTemplate.properties = item.product.properties;
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
          .then((response: any) => {
            loaderStore.setLoaderState(false);
            alertStore.showSuccess("Успешно создан!");
            resolve(response);
          })
          .catch((err: any) => {
            alertStore.showError(err.message);
            loaderStore.setLoaderState(false);
            reject(err);
          });
      });
    },
    updateProduct(payload: ProductTemplateEntity) {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        productApi
          .updateProduct(payload)
          .then((response: any) => {
            loaderStore.setLoaderState(false);
            alertStore.showSuccess("Успешно обновлено!");
            resolve(response);
          })
          .catch((err: any) => {
            alertStore.showError(err.message);
            loaderStore.setLoaderState(false);
            reject(err);
          });
      });
    },
    setEmpty() {
      this.productTemplate = { photos: [], videos: [] };
    },
  },
});
