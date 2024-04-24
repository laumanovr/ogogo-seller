export interface ProductEntity {
  id: string;
  articleNumber: string;
  productName: string;
  description: string;
  categoryId: string;
  price: number;
  productType: Array<number>;
  templateId: string;
  ownerOrganizationId: string;
  status: Array<number>;
  verificationStatus: Array<number>;
  verifierId: number;
  verifierDate: string;
  isRejected: boolean;
  verifierComment: string;
  toArticle: string;
  priceType: Array<number>;
  countOfProduct: number;
  photos: Array<string>;
  videos: Array<string>;
}

export interface CategoryEntity {
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
