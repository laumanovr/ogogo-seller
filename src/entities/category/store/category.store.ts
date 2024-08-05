import { CategoryApiResponse } from "../api/category-api.types";
import { defineStore } from "pinia";
import {
  CategoryProperty,
  CategoryUrl,
  ICategoryState,
} from "./category-store.types";
import { CategoryApi } from "../api/category.api";
import {
  CategoryPagedPayload,
  CategoryPagedResponse,
  CategoryWithPropertiesResponse,
} from "../api/category-api.types";
import { useProductStore } from "@/entities/products/store/product.store";
import { CategoryPagedEntity } from "../model/types";

const productStore = useProductStore();
const categoryApi = new CategoryApi();

export const useCategoryStore = defineStore("category", {
  state: (): Partial<ICategoryState> => ({
    categories: [],
    categoryUrls: [],
    pagedCategories: [],
    categoryWithProperties: [],
  }),
  getters: {
    getPagedCategories(): CategoryPagedEntity[] {
      return this.pagedCategories;
    },
    getCategoryUrls(): CategoryUrl[] {
      return this.categoryUrls;
    },
    getCategoryWithProperties(): CategoryProperty[] {
      return this.categoryWithProperties;
    },
  },
  actions: {
    getAllCategories(): Promise<CategoryApiResponse> {
      return new Promise((resolve, reject) => {
        categoryApi
          .getCategories()
          .then((response) => {
            this.categories = response.result;
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    getCategoriesPagedList(
      payload: CategoryPagedPayload
    ): Promise<CategoryPagedResponse> {
      return new Promise((resolve, reject) => {
        categoryApi
          .getCategoriesPagedList(payload)
          .then((response) => {
            this.pagedCategories = response.items;
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    getCategoryWithPropertiesById(
      id: string
    ): Promise<CategoryWithPropertiesResponse> {
      return new Promise((resolve, reject) => {
        categoryApi
          .getCategoryById(id)
          .then((response) => {
            this.categoryWithProperties = response.result.properties;
            const selectedPropValues: any = [];
            if (productStore?.productTemplate?.properties) {
              this.saveSelectedCategoryPath([
                { name: response.result.categoryName },
              ]);
              Object.entries(productStore.productTemplate.properties).forEach(
                (item) => {
                  selectedPropValues.push({ key: item[0], valueId: item[1] });
                }
              );
              this.categoryWithProperties = this.categoryWithProperties.map(
                (property) => {
                  const selectedObj = selectedPropValues.find(
                    (item: any) => item.key === property.key
                  );
                  property.selectedValueId = selectedObj?.valueId;
                  return property;
                }
              );
            }
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    saveSelectedCategoryPath(categoryPathes: CategoryUrl[]) {
      this.categoryUrls = categoryPathes;
    },
  },
});
