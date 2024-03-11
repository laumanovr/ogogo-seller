import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/password-reset",
    name: "password-reset",
    component: findComponent("password-reset", "PasswordReset"),
  },
];

export default routes;
