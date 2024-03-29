export interface IProduct {
  products?: IProduct[];
  pageIndex?: number;
  search?: string;
  statuses?: object;
  productType?: number;
}

export interface IProductResponse {
  items: IProductResponse[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
