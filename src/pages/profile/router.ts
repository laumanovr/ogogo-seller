import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/profile",
    name: "profile",
    component: findComponent("profile", "Profile"),
  },
];

export default routes;
