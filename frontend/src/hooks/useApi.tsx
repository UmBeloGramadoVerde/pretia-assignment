import axios from "axios";

import { useAxiosInterceptor } from "./useAxiosInterceptor";

export function useApi() {
  const {
    applyAppTokenRefreshInterceptor,
    applyResponseFormattingInterceptor,
    applyAvailableAuthTokenInterceptor
  } = useAxiosInterceptor();
  const DEFAULT_CONFIG = {
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  };
  const apiClient = axios.create(DEFAULT_CONFIG);
  applyAvailableAuthTokenInterceptor(apiClient);
  applyAppTokenRefreshInterceptor(apiClient);
  applyResponseFormattingInterceptor(apiClient);

  return apiClient;
}
