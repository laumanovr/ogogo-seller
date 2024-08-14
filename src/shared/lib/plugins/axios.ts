import { useI18n } from "vue-i18n";
import axios, { AxiosError } from "axios";
import { INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES } from "@/app/router/index.type";
import { useAuthStore } from "@/shared/store/auth";
import router from "@/app/router/";
import { ErrorCodeEnum } from "../utils/error-dictionary";
import { useAlertStore } from "@/shared/store/alert";
import i18n from "@/shared/lib/plugins/i18n";

axios.defaults.baseURL = import.meta.env.VITE_API_SERVER;

interface ErrorResponse {
  error: {
    errorCode: ErrorCodeEnum;
  };
}

function runWhen(error: AxiosError<ErrorResponse>) {
  const errorCode = error?.response?.data?.error?.errorCode;
  if (errorCode && INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES.includes(errorCode))
    return false;
  return true;
}

export default function setup() {
  axios.interceptors.request.use(
    function (config) {
      const authStore = useAuthStore();
      const isActiveSession = authStore.getActiveSession;
      if (
        (config.url === "/api/common/Ping" && isActiveSession) ||
        config.url !== "/api/common/Ping"
      ) {
        const token = authStore.getSessionId;
        config.headers.Authorization = token ? `Bearer ${token}` : "";
      }

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      if (!runWhen(error)) return Promise.reject(error);

      const certificatePing = error?.response?.request?.responseURL?.includes(
        "certificate-ping.txt"
      );

      if (certificatePing) {
        return Promise.reject(error);
      } else {
        let showError = true;
        const authStore = useAuthStore();
        switch (error?.response?.status) {
          case 401:
            showError = false;
            router.push({ name: "login" });
            break;
          case 403:
            showError = false;
            authStore.logout().then(() => {
              router.push({ name: "login" });
            });
            break;
          case 500:
            showError = true;
            const { t } = useI18n();
            alert(t("lang-a42e481a-3030-401e-ae41-080883f1675a"));
            break;
        }
        if (showError) {
          const alertStore = useAlertStore();
          if (error.response?.data?.error) {
            alertStore.showError(
              error.response.data.error?.errorMessage ||
                i18n.global.t("lang-a42e481a-3030-401e-ae41-080883f1675a")
            );
          } else {
            alertStore.showError(
              error?.message ||
                i18n.global.t("lang-a42e481a-3030-401e-ae41-080883f1675a")
            );
          }
        }
        return Promise.reject(error);
      }
    }
  );
}
