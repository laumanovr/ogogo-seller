import axios from "axios";
import { defineStore } from "pinia";
import {
  AuthGetProfileResultInterface,
  AuthState,
  ILogin,
  ILoginResultFail,
  ILoginResultSuccess,
} from "./index.types";
import { useAlertStore } from "@/shared/store/alert";
import { getCurrentUser, login } from "@/shared/api/auth";
import { getItem, setItem } from "@/shared/lib/utils/persistanceStorage";
import {
  AuthorizationChannelEvent,
  BroadcastChannelName,
} from "@/shared/lib/utils/consts";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => {
    return {
      user: null,
      // TODO: remove obsolete state
      accessRequestIds: {},
      // TODO: remove obsolete state
      fidoAuth: false,
      // TODO: remove obsolete state
      availableLanguages: null,
      // TODO: there is user variable above. what is this used for then?
      currentUser: null,
      isLoading: false,
      // TODO: remove obsolete state
      isLoggedIn: false,
      needChangePassword: false,
      // TODO: remove obsolete state
      roleScreensObj: {},
      // TODO: remove obsolete state
      sipAccount: {
        login: null,
        password: null,
      },
    };
  },
  getters: {
    // TODO: remove obsolete getters
    getIsLoggedIn(): boolean {
      return this.isLoggedIn;
    },
    // TODO: remove obsolete getters
    getFullName(): string {
      return this.user?.fullName ?? "";
    },
    // TODO: remove obsolete getters
    getAuthToken(): string {
      return this.user?.token ?? null;
    },
    // TODO: remove obsolete getters
    getLoading(): boolean {
      return this.isLoading;
    },
    // TODO: remove obsolete getters
    getUserLogin(): string {
      return this.user?.login ?? "";
    },
    // TODO: remove obsolete getters
    getRoleId(): string {
      return this.user.roleId;
    },
    // TODO: remove obsolete getters
    getRoleName(): string {
      return this.user.roleName;
    },
    getSessionId(): string {
      return JSON.parse(window.localStorage.getItem("sessionId"));
    }
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
            this.needChangePassword = needChangePassword as boolean;
            
            // TODO: remove direct usage of localStorage actions - only through store(plugin)
            const oldSessionId = getItem("sessionId");
            
            // TODO: remove direct usage of localStorage actions - only through store(plugin)
            setItem("sessionId", result?.sessionId);
            return this.getCurrentUser()
              .then((user) => {
                // send event of updating profile and redirecting to route path to other tabs
                if (BroadcastChannel) {
                  const tabId = sessionStorage.getItem("tabId");

                  const bc = new BroadcastChannel(
                    BroadcastChannelName.AuthorizationChannel
                  );
                  if (oldSessionId && oldSessionId !== result?.sessionId) {
                    bc.postMessage({
                      event: AuthorizationChannelEvent.LoggingIn,
                      tabId,
                    });
                  }
                }

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
          .finally(() => {
            this.isLoading = false;
          });
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
      this.accessRequestIds = {};
      // TODO: remove direct usage of localStorage actions - only through store(plugin)
      setItem("active-session", false);
      // TODO: remove direct usage of localStorage actions - only through store(plugin)
      setItem("sessionId", null);

      const alertStore = useAlertStore();
      alertStore.clearAlerts();

      return Promise.resolve(true);
    },
    // TODO: obsolete function?
    setLang(payload: string) {
      this.user.language = payload;
    },
  },
  persist: true,
});
