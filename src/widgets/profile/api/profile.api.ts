import axios from "axios";
import { IProfileApi } from "./profile-api.types";

export class ProfileApi {
  updateProfile = (data: IProfileApi): Promise<IProfileApi> => {
    return axios({
      method: "PUT",
      url: "/Marketplace/UpdateMarketplaceShop",
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
  getProfile = (): Promise<IProfileApi> => {
    return axios({
      method: "GET",
      url: `/Marketplace/GetMarketplaceShopByUser`,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
