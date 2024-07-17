import axios from "axios";
import { ICategorySettings } from "./index.types";

// TODO: why there is no prefix "/api" for url like /api/Marketplace/GetMarketplaceCategory
export const getCategoryById = (id: string): Promise<ICategorySettings> =>
  axios
    .get(`Marketplace/GetMarketplaceCategory`, {
      params: { id },
    })
    .then((res) => res.data.result);
