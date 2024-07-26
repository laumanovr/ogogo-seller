import { CategoryApiResponse } from "../api/category-api.types";
import { defineStore } from "pinia";
import { useLoaderStore } from "@/shared/store/loader";
import { ICategoryState } from "./category-store.types";
import { CategoryApi } from "../api/category.api";
import {
  CategoryPagedPayload,
  CategoryPagedResponse,
  CategoryWithPropertiesResponse,
} from "../api/category-api.types";
import { useProductStore } from "@/entities/products/store/product.store";

// TODO: remove global loader and set local loader

const loaderStore = useLoaderStore();
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
    getPagedCategories(): any {
      return this.pagedCategories;
    },
    getCategoryUrls(): any {
      return this.categoryUrls;
    },
    getCategoryWithProperties(): any {
      return this.categoryWithProperties;
    },
  },
  actions: {
    getAllCategories(): Promise<CategoryApiResponse> {
      return new Promise((resolve, _) => {
        loaderStore.setLoaderState(true);
        categoryApi
          .getCategories()
          .then((response) => {
            this.categories = response.result;
            resolve(response);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    getCategoriesPagedList(
      payload: CategoryPagedPayload
    ): Promise<CategoryPagedResponse> {
      return new Promise((resolve, _) => {
        loaderStore.setLoaderState(true);
        categoryApi
          .getCategoriesPagedList(payload)
          .then((response) => {
            this.pagedCategories = response.items;
            resolve(response);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    getCategoryWithPropertiesById(
      id: string
    ): Promise<CategoryWithPropertiesResponse> {
      return new Promise((resolve, _) => {
        loaderStore.setLoaderState(true);
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
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    saveSelectedCategoryPath(categoryPathes: any) {
      this.categoryUrls = categoryPathes;
    },
  },
});
