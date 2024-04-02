export interface IProduct {
  products?: IProduct[];
  pageIndex?: number;
  search?: string;
  statuses?: object;
  productType?: number;
  priceRange?: object;
  categories?: string[];
}

export interface IProductResponse {
  items: IProductResponse[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ICategory {
  search: string;
  pageSize: number;
}

export interface ICategoryResponse {
  items: ICategoryResponse[];
}
