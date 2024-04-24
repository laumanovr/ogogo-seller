import {
  BasePageParams,
  ResponseWithStatus,
  WithResultPagination,
} from "./../../../shared/api/index.types";
import { ProductEntity, CategoryEntity } from "../model/types";

export type ProductApiResponse = ResponseWithStatus<
  WithResultPagination<ProductEntity>
>;

export interface ProductPayload extends Partial<BasePageParams> {
  search?: string;
  sortDirection?: number;
  categories?: Array<string>;
  statuses?: Array<number>;
  productType?: number;
  ownerId?: string;
  priceRange?: PriceRange;
  propertiesFilter?: PropertiesFilter;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface PropertiesFilter {}

export interface CategoryPayload {
  search?: string;
  pageSize?: number;
}

export type CategoryResponse = {
  items: Array<CategoryEntity>;
};
