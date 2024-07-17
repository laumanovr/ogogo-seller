import axios from "axios";
import {
  AuthGetProfileResultInterface,
  AuthLoginPayloadInterface,
  AuthLoginResultInterface,
} from "@/shared/api/auth/types";

// TODO: set one format for url style. example /Clients/Login or /clients/login for all requests

// TODO: why clients module and not auth module for seller login?
export const login = (
  credentials: AuthLoginPayloadInterface
): Promise<AuthLoginResultInterface> => {
  return axios({
    method: "POST",
    url: "Clients/Login",
    data: credentials,
  }).then((response) => response.data.result);
};

export const getCurrentUser = (): Promise<AuthGetProfileResultInterface> => {
  return axios({
    method: "GET",
    url: `auth/getProfile`,
  }).then((response) => response.data.result);
};

export const logout = (): Promise<boolean> => {
  return axios({
    method: "POST",
    url: "auth/logout",
  }).then((response) => response.data.ok);
};

export const updatePassword = (payload: {
  newPassword?: string;
}): Promise<boolean> => {
  return axios
    .post("Auth/UpdateUserPassword", payload)
    .then((res) => res.data.ok);
};

export const forgotPassword = (payload?: {
  login: string;
}): Promise<boolean> => {
  return axios.post("Auth/ForgotPassword", payload).then((res) => res.data.ok);
};

export const getSipAccount = (): Promise<{ login: string; password: string }> =>
  axios.get("Auth/GetSipAccount").then((res) => res.data.result);

export default {
  login,
  getCurrentUser,
  logout,
  updatePassword,
  forgotPassword,
  getSipAccount,
};
