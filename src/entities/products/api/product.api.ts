import axios from "axios";
import {
  ProductPayload,
  ProductApiResponse,
  CategoryPayload,
  CategoryResponse,
} from "./product-api.types";

export class ProductApi {
  getProducts = (data: ProductPayload): Promise<ProductApiResponse> => {
    return axios({
      method: "POST",
      url: `/MarketplaceProduct/GetMarketplaceProductPagedList`,
      data: data,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };

  getCategories = (data: CategoryPayload): Promise<CategoryResponse> => {
    return axios({
      method: "POST",
      url: `/Marketplace/GetMarketplaceCategoryPagedList`,
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
