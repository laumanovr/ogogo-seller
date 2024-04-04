import axios from "axios";
import { OrderApiResponse, OrderPayload } from "./order-api.types";

export class OrderApi {
  getOrders = (data: OrderPayload): Promise<OrderApiResponse> => {
    return axios({
      method: "POST",
      url: `/MarketplaceOrder/GetMarketplaceOrderPagedList`,
      data: data,
    })
      .then((response) => response.data)
      .catch((err) => Promise.reject(err));
  };
}
