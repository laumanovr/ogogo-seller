import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/products",
    name: "products",
    component: findComponent("product", "Product"),
  },
];

export default routes;
