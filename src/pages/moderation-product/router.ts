import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/moderate-products",
    name: "moderate-products",
    component: findComponent("moderation-product", "ModerationProduct"),
  },
  {
    path: "/moderate-products/:id",
    name: "moderate-product-detail",
    component: findComponent("moderation-product", "ModerationProductDetail"),
  },
];

export default routes;
