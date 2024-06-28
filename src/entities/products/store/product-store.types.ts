import { ProductEntity, ProductTemplateEntity } from "../model/types";

export interface IProductState {
  products: ProductEntity[];
  productTemplate: ProductTemplateEntity;
}
