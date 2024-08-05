import { CategoryEntity, CategoryPagedEntity } from "../model/types";

export interface ICategoryState {
  categories: CategoryEntity[];
  categoryUrls: CategoryUrl[];
  pagedCategories: CategoryPagedEntity[];
  categoryWithProperties: CategoryProperty[];
}

export interface CategoryProperty {
  key: string;
  selectedValueId: string;
  propertyId: string;
  allowedValues: object
}

export interface CategoryUrl {
  name: string
}
