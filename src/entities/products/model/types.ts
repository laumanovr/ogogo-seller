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

export interface ProductTemplateEntity {
  toArticle: string;
  productName: string;
  description: string;
  categoryId: string;
  price: string;
  discount: number;
  organizationId: string;
  productType: number;
  productPriceType: number;
  photos: string[];
  videos: string[];
  templateId: string;
  countOfProduct: string;
  isSaveAsDraft: Boolean;
  properties: Object;
}

export interface ProductImageEntity {
  fileId: string;
}
