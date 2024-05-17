import axios from "axios";
import {
  ProductPayload,
  ProductApiResponse,
  ProductImageResponse,
} from "./product-api.types";
import { ProductTemplateEntity } from "../model/types";

export class ProductApi {
  getProducts = (data: ProductPayload): Promise<ProductApiResponse> => {
    return axios({
      method: "POST",
      url: `MarketplaceProduct/GetMarketplaceProductPagedList`,
      data: data,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
  getProductById = (id: string) => {
    return axios({
      method: "GET",
      url: `MarketplaceProduct/GetMarketplaceProduct?id=${id}`,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
  uploadFile = (file: FormData): Promise<ProductImageResponse> => {
    return axios({
      method: "POST",
      url: "File/UploadFile",
      data: file,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
  createProduct = (data: ProductTemplateEntity) => {
    return axios({
      method: "POST",
      url: `MarketplaceProduct/CreateMarketplaceProduct`,
      data: data,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
  updateProduct = (data: ProductTemplateEntity) => {
    return axios({
      method: "PUT",
      url: "MarketplaceProduct/UpdateMarketplaceProduct",
      data: data,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
}
