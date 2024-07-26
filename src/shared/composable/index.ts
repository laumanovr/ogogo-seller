import axios from "axios";
import { useAuthStore } from "@/shared/store/auth";
const authStore = useAuthStore();

export const getFileById = (fileId: string) => {
  return `${axios.defaults.baseURL}File/FileById?id=${fileId}&sessionId=${authStore.getSessionId}`;
};
