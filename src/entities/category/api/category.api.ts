import axios from "axios";
import { CategoryApiResponse } from "./category-api.types";

export class CategoryApi {
  getCategories = (): Promise<CategoryApiResponse> => {
    return axios({
      method: "GET",
      url: `/Marketplace/GetMarketplaceCategories`,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
}
