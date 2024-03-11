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

// router.beforeEach(
//   (
//     to: RouteLocationNormalized,
//     from: RouteLocationNormalized,
//     next: Function
//   ) => {
//     const isAuthenticated = Boolean(getItem("sessionId")),
//       requiresAuth = to.matched.some((record) => record.meta.requiresAuth),
//       roleScreensObj = getItem("auth")?.roleScreensObj ?? null,
//       currentMenu = getItem("auth")?.uiElements ?? [];

//     if (!isAuthenticated) {
//       if (requiresAuth) {
//         return next("/");
//       }
//       next();
//     } else {
//       // authenticated -> not authenticated
//       if (to.path === "/" || to.path === "/forgot-password") {
//         // redirect to first current menu or login with error
//         if (currentMenu.length === 0) {
//           next();
//         } else {
//           if (!roleScreensObj[to.meta.id]) {
//             next(currentMenu[0].link);
//           } else {
//             next();
//           }
//         }
//       } else {
//         // redirect to first current menu or login with error
//         if (currentMenu.length === 0) {
//           next("/");
//           return store.dispatch(
//             notificationActionTypes.addErrorNotification,
//             i18n.t("label-b7162593-1b0a-4c35-b4e9-845fb90a47ad")
//           );
//         } else {
//           if (to.meta?.default) {
//             next();
//           } else if (!roleScreensObj[to.meta.id]) {
//             if (to.fullPath.startsWith("/dashboard/params")) {
//               const otherParamsPages = MENU_LIST.filter(
//                 (e) => roleScreensObj[e.id]
//               );
//               if (otherParamsPages.length) {
//                 next({ path: otherParamsPages[0].link });
//               } else {
//                 next({ name: currentMenu[0].link });
//               }
//             } else {
//               next({ name: currentMenu[0].link });
//             }
//           } else {
//             next();
//           }
//         }
//       }
//     }
//   }
// );

const app = createApp(App);

app.use(router).use(pinia).use(i18n);

app.mount("#app");

app.directive("maska", vMaska);
