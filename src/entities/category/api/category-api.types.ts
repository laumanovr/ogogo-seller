import { ResponseWithStatus } from "@/shared/api/index.types";
import { CategoryEntity, CategoryPagedEntity } from "../model/types";

export type CategoryApiResponse = ResponseWithStatus<CategoryEntity[]>;

export interface CategoryPagedPayload {
  search?: string;
  pageSize?: number;
}

export type CategoryPagedResponse = {
  items: Array<CategoryPagedEntity>;
};
