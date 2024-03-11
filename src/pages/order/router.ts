import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/orders",
    name: "orders",
    component: findComponent("order", "Order"),
  },
];

export default routes;
