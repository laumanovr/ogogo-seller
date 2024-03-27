export interface IProduct {
  products: IProduct[];
}

export interface IProductResponse {
  items: IProductResponse[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
