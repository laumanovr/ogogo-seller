import axios from "axios";
import { defineStore } from "pinia";
import {
  AuthGetProfileResultInterface,
  AuthState,
  ILogin,
  ILoginResultFail,
  ILoginResultSuccess,
} from "./index.types";
import { getCurrentUser, login } from "@/shared/api/auth";
import { getItem, setItem } from "@/shared/lib/utils/persistanceStorage";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
    };
  },
  getters: {
    getSessionId(): string {
      return JSON.parse(window.localStorage.getItem("sessionId"));
    },
  },
  actions: {
    login(
      payload: ILogin
    ): Promise<
      ILoginResultSuccess | ILoginResultFail | AuthGetProfileResultInterface
    > {
      return new Promise((resolve, reject) => {
        login(payload)
          .then((result) => {
            const needChangePassword = result?.needChangePassword ?? false;
            // TODO: remove direct usage of localStorage actions - only through store(plugin)
            setItem("needChangePassword", needChangePassword);
            // TODO: remove direct usage of localStorage actions - only through store(plugin)
            setItem("sessionId", result?.sessionId);
            return this.getCurrentUser()
              .then((user) => {
                // TODO: remove direct usage of localStorage actions - only through store(plugin)
                setItem("active-session", true);
                resolve(user);
              })
              .catch(reject);
          })
          .catch((err) => {
            if (axios.isAxiosError(err)) {
              reject(err?.response?.data);
            } else {
              reject(err);
            }
          })
          .finally(() => {});
      });
    },
    getCurrentUser(): Promise<AuthGetProfileResultInterface> {
      return new Promise<AuthGetProfileResultInterface>((resolve, reject) => {
        getCurrentUser()
          .then((user) => {
            // TODO: remove direct usage of localStorage actions - only through store(plugin)
            window.localStorage.setItem("currentUser", JSON.stringify(user));
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout(): Promise<boolean> {
      this.user = null;
      // TODO: remove direct usage of localStorage actions - only through store(plugin)
      setItem("active-session", false);
      // TODO: remove direct usage of localStorage actions - only through store(plugin)
      setItem("sessionId", null);
      return Promise.resolve(true);
    },
  },
  persist: true,
});
