import axios from "axios";

export class ProductApi {
  getProducts = (data: any): Promise<any> => {
    return axios({
      method: "POST",
      url: `/Marketplace/GetMarketplaceProductPagedList`,
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
