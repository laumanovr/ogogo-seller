import { ProductEntity, ProductTemplateEntity } from "../model/types";

export interface IProductState {
  products: ProductEntity[];
  productTemplate: ProductTemplateEntity;
  hasProducts: boolean;
  hasStatusProducts: boolean;
  totalItems: number;
  productCategoryId: string
}
