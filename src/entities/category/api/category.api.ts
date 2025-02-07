import axios from "axios";
import {
  CategoryApiResponse,
  CategoryPagedPayload,
  CategoryPagedResponse,
} from "./category-api.types";

export class CategoryApi {
  getCategories = (): Promise<CategoryApiResponse> => {
    return axios({
      method: "GET",
      url: `/Marketplace/GetMarketplaceCategories`,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
  getCategoriesPagedList = (
    data: CategoryPagedPayload
  ): Promise<CategoryPagedResponse> => {
    return axios({
      method: "POST",
      url: `/Marketplace/GetMarketplaceCategoryPagedList`,
      data: data,
    })
      .then((response: any) => response.data.result)
      .catch((err: any) => Promise.reject(err));
  };
  getCategoryById = (id: string) => {
    return axios({
      method: "GET",
      url: `/Marketplace/GetMarketplaceCategory?id=${id}`,
    })
      .then((response: any) => response.data)
      .catch((err: any) => Promise.reject(err));
  };
}
