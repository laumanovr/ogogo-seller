import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/notifications",
    name: "notifications",
    component: findComponent("notification", "Notification"),
  },
];

export default routes;
