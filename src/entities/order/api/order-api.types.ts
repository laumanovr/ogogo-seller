import {
  BasePageParams,
  ResponseWithStatus,
  WithResultPagination,
} from "@/shared/api/index.types";
import { OrderEntity } from "../model/types";

export type OrderApiResponse = ResponseWithStatus<
  WithResultPagination<OrderEntity>
>;

export interface OrderPayload extends Partial<BasePageParams> {
  search?: string;
  queryParams?: QueryParams;
  sortDirection?: number;
}

export interface QueryParams {
  status: number;
  statuses: Array<number>;
}
