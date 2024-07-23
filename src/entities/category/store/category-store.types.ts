import { CategoryEntity } from "../model/types";

export interface ICategoryState {
  categories: CategoryEntity[];
  categoryUrls: object[];
  pagedCategories: object[];
  categoryWithProperties: CategoryProperty[];
}

interface CategoryProperty {
  key: string;
  selectedValueId: string;
}
