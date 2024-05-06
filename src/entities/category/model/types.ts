export interface CategoryEntity {
  id: string;
  categoryName: string;
  parentId: string;
  icoBase64: string;
  childMarketplaceCategories: CategoryEntity[];
}
