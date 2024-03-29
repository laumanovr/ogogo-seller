import axios from "axios";
import { IProductApi, IProductResponseApi } from "./product-api.types";

export class ProductApi {
  getProducts = (data: IProductApi): Promise<IProductResponseApi> => {
    return axios({
      method: "POST",
      url: `/Marketplace/GetMarketplaceProductPagedList`,
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
