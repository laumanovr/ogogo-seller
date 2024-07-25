import { defineStore } from "pinia";
import { useLoaderStore } from "@/shared/store/loader";
import { IProfile } from "./profile-store.types";
import { IProfileApi } from "../api/profile-api.types";
import { ProfileApi } from "../api/profile.api";
const profileApi = new ProfileApi();
const loaderStore = useLoaderStore();

// TODO: remove global loader and set local loader

export const useProfileStore = defineStore("profile", {
  state: (): Partial<IProfile> => ({
    // TODO: remove direct usage of localStorage actions - only through store(plugin)
    currentUser: JSON.parse(window.localStorage.getItem("currentUser")),
    profileObj: {
      id: null,
      logoBase64: null,
      name: null,
      description: null,
      logoFileName: null,
      version: null,
    },
  }),
  getters: {
    getCurrentUser(): any {
      return this.currentUser;
    },
    getProfileObj(): any {
      return this.profileObj;
    },
  },
  actions: {
    updateProfileInfo(payload: IProfile) {
      loaderStore.setLoaderState(true);
      profileApi
        .updateProfile(payload)
        .then((response) => {
          return response;
        })
        .finally(() => {
          loaderStore.setLoaderState(false);
        });
    },
    getProfileInfo(): Promise<IProfileApi> {
      return new Promise((resolve, _) => {
        loaderStore.setLoaderState(true);
        profileApi
          .getProfile()
          .then((response) => {
            this.profileObj.name = response.name;
            this.profileObj.description = response.description;
            this.profileObj.logoBase64 = response.logoBase64;
            this.profileObj.version = response.version;
            resolve(response);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
    updateUserPassword(payload: any) {
      return new Promise((resolve, _) => {
        loaderStore.setLoaderState(true);
        profileApi
          .updatePassword(payload)
          .then((response) => {
            resolve(response);
          })
          .finally(() => {
            loaderStore.setLoaderState(false);
          });
      });
    },
  },
});
