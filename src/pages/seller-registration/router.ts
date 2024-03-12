import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/seller-registration",
    name: "seller-registration",
    component: findComponent("seller-registration", "SellerRegistration"),
    meta: { requiresAuth: true },
  },
];

export default routes;
