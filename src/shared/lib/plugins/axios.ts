import { useI18n } from "vue-i18n";
import axios, { AxiosError } from "axios";

import { getItem } from "../utils/persistanceStorage";
import { INTERCEPTOR_EXCLUDE_LIST_ERROR_CODES } from "@/app/router/index.type";
import { useAuthStore } from "@/shared/store/auth";

import router from "@/app/router/";
import { ErrorCodeEnum } from "../utils/error-dictionary";

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
      // TODO: replace getItem with useAuthStore getter
      const isActiveSession = getItem("active-session");
      if (
        (config.url === "/api/common/Ping" && isActiveSession) ||
        config.url !== "/api/common/Ping"
      ) {
        // TODO: replace getItem with useAuthStore getter
        const token = getItem("sessionId");
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

            // TODO: use router name params for router
            router.push("/");
            break;
          case 403:
            showError = false;
            await authStore.logout;
            // TODO: use router name params for router
            router.push("/");
            break;
          case 500:
            const { t } = useI18n();

            // TODO: unknown locale key
            alert(t("label-5a8130e9-116a-4c54-8be2-166380fae5d1"));
            break;
        }
        if (showError) {
        }
        return Promise.reject(error);
      }
    }
  );
}
