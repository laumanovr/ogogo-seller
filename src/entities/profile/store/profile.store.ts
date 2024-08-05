import { defineStore } from "pinia";
import { IProfile } from "./profile-store.types";
import { IProfileApi } from "../api/profile-api.types";
import { ProfileApi } from "../api/profile.api";
const profileApi = new ProfileApi();

export const useProfileStore = defineStore("profile", {
  state: (): Partial<IProfile> => ({
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
    getProfileObj(): any {
      return this.profileObj;
    },
  },
  actions: {
    updateProfileInfo(payload: IProfile) {
      return new Promise((resolve, reject) => {
        profileApi
          .updateProfile(payload)
          .then((response) => {
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    getProfileInfo(): Promise<IProfileApi> {
      return new Promise((resolve, reject) => {
        profileApi
          .getProfile()
          .then((response) => {
            this.profileObj.name = response.name;
            this.profileObj.description = response.description;
            this.profileObj.logoBase64 = response.logoBase64;
            this.profileObj.version = response.version;
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
    updateUserPassword(payload: any) {
      return new Promise((resolve, reject) => {
        profileApi
          .updatePassword(payload)
          .then((response) => {
            resolve(response);
          })
          .catch(() => {
            reject();
          });
      });
    },
  },
});
