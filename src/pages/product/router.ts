import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/products",
    name: "products",
    component: findComponent("product", "ProductList"),
  },
  {
    path: "/product-create",
    name: "productCreate",
    component: findComponent("product", "ProductCreate"),
  },
];

export default routes;
