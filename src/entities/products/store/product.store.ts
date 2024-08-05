import { defineStore } from "pinia";
import { IProductState } from "./product-store.types";
import { ProductApi } from "../api/product.api";
import {
  ProductPayload,
  ProductApiResponse,
  ProductImageResponse,
  ProductDetailApiResponse,
} from "../api/product-api.types";
import {
  FileValidationEntity,
  ProductEntity,
  ProductTemplateEntity,
  SelectedTemplate,
  ValidationEntity,
} from "../model/types";

const productApi = new ProductApi();

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
    productCategoryId: "",
  }),
  getters: {
    getProducts(): ProductEntity[] {
      return this.products;
    },
    getHasProducts(): boolean {
      return this.hasProducts;
    },
    getHasStatusProducts(): boolean {
      return this.hasStatusProducts;
    },
    getTotalItems(): number {
      return this.totalItems;
    },
    getProductTemplate(): ProductTemplateEntity {
      return this.productTemplate;
    },
    getValidationName(): ValidationEntity {
      return this.productTemplate.validationDetails?.fields?.name;
    },
    getValidationDescription(): ValidationEntity {
      return this.productTemplate.validationDetails?.fields?.description;
    },
    getValidationPrice(): ValidationEntity {
      return this.productTemplate.validationDetails?.fields?.price;
    },
    getValidationCount(): ValidationEntity {
      return this.productTemplate.validationDetails?.fields?.countofproduct;
    },
    getValidationFile(): FileValidationEntity {
      return this.productTemplate.validationDetails?.files;
    },
    getProductCategoryId(): string {
      return this.productCategoryId;
    },
  },
  actions: {
    getAllProducts(payload: ProductPayload): Promise<ProductApiResponse> {
      return new Promise((resolve, reject) => {
        productApi
          .getProducts(payload)
          .then((response) => {
            this.products = response.result.items;
            this.hasProducts = Boolean(response.result.totalPages);
            this.hasStatusProducts = Boolean(response.result.items.length);
            this.totalItems = response.result.totalCount;
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    getExactProductById(id: string): Promise<ProductDetailApiResponse> {
      return new Promise((resolve, reject) => {
        productApi
          .getProductById(id)
          .then((response) => {
            const foundProduct = response.result;
            this.productCategoryId = foundProduct.categoryId;
            this.setSelectedTemplateOrProduct({
              product: foundProduct,
              type: "product",
            });
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    setSelectedTemplateOrProduct(item: SelectedTemplate) {
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
        productApi
          .uploadFile(formData)
          .then((response) => {
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    createProduct(payload: ProductTemplateEntity) {
      return new Promise((resolve, reject) => {
        productApi
          .createProduct(payload)
          .then((response: any) => {
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    updateProduct(payload: ProductTemplateEntity) {
      return new Promise((resolve, reject) => {
        productApi
          .updateProduct(payload)
          .then((response: any) => {
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    setEmpty() {
      this.productTemplate = { photos: [], videos: [] };
    },
  },
});
