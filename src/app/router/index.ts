import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/shared/store/auth";
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

router.beforeEach(
  (
    to: RouteLocationNormalized,
    // @ts-ignore
    from: RouteLocationNormalized,
    next: Function
  ) => {
    const authStore = useAuthStore();
    const isAuthenticated = Boolean(authStore.getSessionId);

    if (to.name === "login" && isAuthenticated) {
      next({ name: "products" });
    } else if (to.name === "login" && !isAuthenticated) {
      next();
    } else if (isAuthenticated) {
      next();
    } else {
      next({ name: "login" });
    }
  }
);

export default router;
