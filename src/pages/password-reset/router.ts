import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/password-reset",
    name: "password-reset",
    component: findComponent("password-reset", "PasswordReset"),
    meta: { requiresAuth: true },
  },
];

export default routes;
