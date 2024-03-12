import { AuthMiddleware } from "@/app/router/middlware/auth";
import { AccessRequestMiddleware } from "@/app/router/middlware/access-request";
import Chain from "./middlware/chain";
import { flattenRoutes, transformToRouter } from "@/shared/lib/utils/route";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import loginRoutes from "@/pages/login/router";
import passwordReset from "@/pages/password-reset/router";
import profileRoutes from "@/pages/profile/router";
import orderRoutes from "@/pages/order/router";
import productRoutes from "@/pages/product/router";
import notificationRoutes from "@/pages/notification/router";
import moderationProductRoutes from "@/pages/moderation-product/router";
import moderationTemplateRoutes from "@/pages/moderation-template/router";

const routes: RouteRecordRaw[] = [
  ...loginRoutes,
  ...passwordReset,
  ...profileRoutes,
  ...orderRoutes,
  ...productRoutes,
  ...notificationRoutes,
  ...moderationProductRoutes,
  ...moderationTemplateRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const _routes = flattenRoutes(routes);
const finalRoutes = transformToRouter(_routes);

const middlewares = [new AuthMiddleware(), new AccessRequestMiddleware()];
const chain = new Chain(middlewares, finalRoutes);

router.beforeEach(() => {
  middlewares;
});

export default router;
