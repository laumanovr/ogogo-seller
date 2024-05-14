import axios from "axios";
import {
  ProductPayload,
  ProductApiResponse,
  ProductImageResponse,
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
  uploadFile = (file: FormData): Promise<ProductImageResponse> => {
    return axios({
      method: "POST",
      url: "/File/UploadFile",
      data: file,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
  createProduct = (data) => {
    return axios({
      method: "POST",
      url: `/MarketplaceProduct/CreateMarketplaceProduct`,
      data: data,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
}
