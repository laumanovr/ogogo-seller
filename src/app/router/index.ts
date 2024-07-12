import { AuthMiddleware } from "@/app/router/middlware/auth";
import { AccessRequestMiddleware } from "@/app/router/middlware/access-request";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
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

router.beforeEach(() => {
  middlewares;
});

export default router;
