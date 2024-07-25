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

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      currentUser: null,
      needChangePassword: false,
      sessionId: "",
      activeSession: false,
    };
  },
  getters: {
    getSessionId(): string {
      return this.sessionId;
    },
    getActiveSession(): boolean {
      return this.activeSession;
    },
    getCurrentProfile(): any {
      return this.currentUser;
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
            this.needChangePassword = result?.needChangePassword ?? false;
            this.sessionId = result?.sessionId;
            return this.getCurrentUser()
              .then((user) => {
                this.activeSession = true;
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
            this.currentUser = user;
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout(): Promise<boolean> {
      this.currentUser = null;
      this.sessionId = "";
      this.activeSession = false;
      return Promise.resolve(true);
    },
  },
  persist: {
    storage: localStorage,
  },
});
