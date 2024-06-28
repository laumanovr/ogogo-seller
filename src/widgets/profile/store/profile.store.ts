import { defineStore } from "pinia";
import { useAlertStore } from "@/shared/store/alert";
import { useLoaderStore } from "@/shared/store/loader";
import { IProfile } from "./profile-store.types";
import { IProfileApi } from "./../api/profile-api.types";
import { ProfileApi } from "../api/profile.api";
const profileApi = new ProfileApi();
const loaderStore = useLoaderStore();
const alertStore = useAlertStore();

export const useProfileStore = defineStore("profileStore", {
  state: (): Partial<IProfile> => ({
    currentUser: JSON.parse(window.localStorage.getItem("currentUser")),
  }),
  getters: {},
  actions: {
    updateProfileInfo(payload: IProfile) {
      loaderStore.setLoaderState(true);
      profileApi
        .updateProfile(payload)
        .then((response) => {
          loaderStore.setLoaderState(false);
          return response;
        })
        .catch((err) => {
          alertStore.showError(err.message);
          loaderStore.setLoaderState(false);
        });
    },
    getProfileInfo(): Promise<IProfileApi> {
      return new Promise((resolve, reject) => {
        loaderStore.setLoaderState(true);
        profileApi
          .getProfile()
          .then((response) => {
            loaderStore.setLoaderState(false);
            resolve(response);
          })
          .catch((err) => {
            alertStore.showError(err.message);
            loaderStore.setLoaderState(false);
            reject(err);
          });
      });
    },
  },
});
