import { AuthMiddleware } from "@/app/router/middlware/auth";
import { AccessRequestMiddleware } from "@/app/router/middlware/access-request";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { getItem } from "@/shared/lib/utils/persistanceStorage";
import { RouteLocationNormalized } from "vue-router";
import loginRoutes from "@/pages/login/router";
import passwordReset from "@/pages/password-reset/router";
import sellerRegistration from "@/pages/seller-registration/router";
import profileRoutes from "@/pages/profile/router";
import orderRoutes from "@/pages/order/router";
import productRoutes from "@/pages/product/router";
import notificationRoutes from "@/pages/notification/router";

const routes: RouteRecordRaw[] = [
  ...loginRoutes,
  ...passwordReset,
  ...sellerRegistration,
  ...profileRoutes,
  ...orderRoutes,
  ...productRoutes,
  ...notificationRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const middlewares = [new AuthMiddleware(), new AccessRequestMiddleware()];

router.beforeEach(
  (
    to: RouteLocationNormalized,
    // @ts-ignore
    from: RouteLocationNormalized,
    next: Function
  ) => {
    // TODO: why is middlewares just declared here?
    middlewares;
    const isAuthenticated = Boolean(getItem("sessionId")),
      requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (!isAuthenticated) {
      if (
        requiresAuth &&
        to.name !== "password-reset" &&
        to.name !== "seller-registration"
      ) {
        return next({ name: "login" });
      }
      next();
    } else if (to.name === "login" && !isAuthenticated) {
      next({ name: "profile" });
    } else {
      next();
    }
  }
);

export default router;
