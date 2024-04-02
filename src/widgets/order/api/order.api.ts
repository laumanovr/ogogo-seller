import axios from "axios";

export class OrderApi {
  getOrders = (data) => {
    return axios({
      method: "POST",
      url: `/MarketplaceOrder/GetMarketplaceOrderPagedList`,
      data: data,
    })
      .then((response) => response.data.result)
      .catch((err) => Promise.reject(err));
  };
}
