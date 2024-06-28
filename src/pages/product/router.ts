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
  {
    path: "/product-update/:id",
    name: "productUpdate",
    component: findComponent("product", "ProductUpdate"),
  },
];

export default routes;
