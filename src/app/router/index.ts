import { AuthMiddleware } from "@/app/router/middlware/auth";
import { AccessRequestMiddleware } from "@/app/router/middlware/access-request";
import Chain from "./middlware/chain";
import { flattenRoutes, transformToRouter } from "@/shared/lib/utils/route";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// import categoryRoute from "@/pages/category/router/router";
// import propertyRoutes from "@/pages/property/router";
import loginRoutes from "@/pages/login/router";
import profileRoutes from "@/pages/profile/router";
// import shopRoutes from "@/pages/shop/router";
// import productRoutes from "@/pages/product/router";

const routes: RouteRecordRaw[] = [
  // ...categoryRoute,
  // ...propertyRoutes,
  ...loginRoutes,
  ...profileRoutes,
  // ...shopRoutes,
  // ...productRoutes,
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
