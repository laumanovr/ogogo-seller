export interface CategoryEntity {
  id: string;
  categoryName: string;
  parentId: string;
  icoBase64: string;
  childMarketplaceCategories: CategoryEntity[];
}
export interface CategoryPagedEntity {
  id: string;
  categoryName: string;
  categoryNameKy: string;
  categoryNameEn: string;
  icoBase64: string;
  imageId: string;
  parentId: string;
  childMarketplaceCategoryIdList: string[];
  sequenceNumber: number;
}
