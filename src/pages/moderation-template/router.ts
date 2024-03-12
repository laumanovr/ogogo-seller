import { findComponent } from "@/shared/lib/utils/findComponent";

const routes = [
  {
    path: "/moderate-templates",
    name: "moderate-templates",
    component: findComponent("moderation-template", "ModerationTemplate"),
  },
];

export default routes;
