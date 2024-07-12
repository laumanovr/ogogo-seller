import { createApp } from "vue";
import App from "@/app/App.vue";
import router from "./app/router";
import pinia from "@/app/store/index";
import "./app/style/main.scss";
import interceptors from "@/shared/lib/plugins/axios";
import "virtual:uno.css";
import i18n from "@/shared/lib/plugins/i18n";
import { vMaska } from "maska";
import { getItem } from "./shared/lib/utils/persistanceStorage";
import { RouteLocationNormalized } from "vue-router";

interceptors();

router.beforeEach(
  (
    to: RouteLocationNormalized,
    // @ts-ignore
    from: RouteLocationNormalized,
    next: Function
  ) => {
    const isAuthenticated = Boolean(getItem("sessionId")),
      requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (!isAuthenticated) {
      if (
        requiresAuth &&
        to.path !== "/password-reset" &&
        to.path !== "/seller-registration"
      ) {
        return next("/");
      }
      next();
    } else if (to.path === "/" && !isAuthenticated) {
      next("/profile");
    } else {
      next();
    }
  }
);

const app = createApp(App);

app.use(router).use(pinia).use(i18n);

app.mount("#app");

app.directive("maska", vMaska);
