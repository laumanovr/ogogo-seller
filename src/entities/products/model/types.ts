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
  id?: string;
  toArticle?: string;
  productName?: string;
  description?: string;
  categoryId?: string;
  price?: number;
  discount?: number;
  organizationId?: string;
  productType?: number;
  productPriceType?: number;
  photos?: string[];
  videos?: string[];
  templateId?: string;
  countOfProduct?: number;
  isSaveAsDraft?: Boolean;
  properties?: object;
  validationDetails?: {
    fields?: {
      name?: ValidationEntity;
      description?: ValidationEntity;
      price?: ValidationEntity;
      countofproduct?: ValidationEntity;
    };
    files?: {
      photo?: ValidationEntity;
      video?: ValidationEntity;
    };
  };
}

export interface ValidationEntity {
  validationComment: string;
  moderationDate: string;
}

export interface FileValidationEntity {
  photo?: ValidationEntity;
  video?: ValidationEntity;
}

export interface ProductImageEntity {
  fileId: string;
}

export interface SelectedTemplate {
  type: string;
  product: any;
}
