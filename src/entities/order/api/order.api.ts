import axios from "axios";
import { OrderApiResponse, OrderPayload } from "./order-api.types";

export class OrderApi {
  getOrders = (data: OrderPayload): Promise<OrderApiResponse> => {
    return axios({
      method: "POST",
      url: `/MarketplaceOrder/GetMarketplaceOrderPagedList`,
      data: data,
    })
      .then((response: any) => response.data)
      .catch((err: any) => Promise.reject(err));
  };
}
