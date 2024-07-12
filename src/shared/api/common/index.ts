import axios from "axios";
import {
  AuthGetProfileResultInterface,
} from "@/shared/api/auth/types";


export const getGeneralParameters =
  (): Promise<AuthGetProfileResultInterface> => {
    return axios({
      method: "GET",
      url: `/api/Common/GetGeneralParameters`,
    }).then((response) => response.data.result);
  };
