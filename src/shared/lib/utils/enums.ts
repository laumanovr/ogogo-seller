export enum MenuItems {
  Products = "products",
  Orders = "orders",
  Notifications = "notifications",
  Cabinet = "profile",
}

export enum ProductStatus {
  ALL = 0,
  DRAFT = 14800,
  PUBLISHED = 14801,
  AWAITING_MODERATION = 14802,
  AWAITING_APPROVE_TO = 14803,
  APPROVED = 14804,
  ARCHIVED = 14805,
  REQUIRE_IMPROVEMENT = 14806,
  BLOCKED = 14807,
}

export enum ProductType {
  NEW = 14701,
}

export enum PriceType {
  KGS = 14600,
  USD = 14601,
}

export enum ProductMode {
  CREATE = "create",
  UPDATE = "update",
}

export enum TabValue {
  ONE = "one",
  TWO = "two",
}
