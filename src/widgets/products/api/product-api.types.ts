export interface IProductApi {
  products?: IProductApi[];
  pageIndex?: number;
  search?: string;
  statuses?: object;
  productType?: number;
}

export interface IProductResponseApi {
  items: IProductResponseApi[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface ICategory {
  search: string;
  pageSize: number;
}
