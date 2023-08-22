/* import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import axios from "axios";

const get = async () => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles`
  );
  if (!response.status)
    throw new Error("Failed on get user request" + JSON.stringify(response));

  return await response.data;
};

const post = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles`
  );
  if (!response.status)
    throw new Error("Failed on get user request" + JSON.stringify(response));

  return await response.data;
};

const patch = async () => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles`
  );
  if (!response.status)
    throw new Error("Failed on get user request" + JSON.stringify(response));

  return await response.data;
};

export function useApi<
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData
>(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
  >
) {
  const { getAuthStorage } = useStorage();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const token = await getAuthStorage();
      return fetcher(queryKey[1], token?.accessToken ?? "");
    },
    ...options,
  });
} */

/* import { useState } from "react";
import axios, { Axios, AxiosRequestConfig } from "axios";
import {
  UseQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

// Utility function to refresh the access token
async function refreshAccessToken(refreshToken: string) {
  const response = await axios.post("/refresh-token", { refreshToken });
  return response.data.accessToken;
}

export function useApi() {
  const [api] = useState(() => {
    const instance = axios.create({
      baseURL: "your_api_base_url",
    });

    return instance;
  });

  const queryClient = useQueryClient();

  const refreshTokenMutation = useMutation(refreshAccessToken, {
    onSettled: () => {
      queryClient.invalidateQueries(); // Invalidate all queries on token refresh
    },
  });

  // Function to make authenticated requests using Axios and handle token refresh
  async function authenticatedRequest(config: AxiosRequestConfig<any>) {
    try {
      return await api(config);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) await refreshTokenMutation.mutateAsync(refreshToken);
        return await api(config);
      }
      throw error;
    }
  }

  function useAuthenticatedQuery<
    TQueryKey extends [string, Record<string, unknown>?],
    TQueryFnData,
    TError,
    TData = TQueryFnData
  >(
    queryKey: TQueryKey,
    fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
    options?: Omit<
      UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
      "queryKey" | "queryFn"
    >
  ) {
    return useQuery({
      queryKey,
      queryFn: async () => {
        authenticatedRequest(queryFn())
        const token = await getAuthStorage();
        return fetcher(queryKey[1], token?.accessToken ?? "");
      },
      ...options,
    });
  }

  return {
    api,
    authenticatedRequest,
    useAuthenticatedQuery,
  };
}
 */

import { BaseApiResponse } from "@/types/api";
import { AuthToken } from "@/types/authToken";
import axios, { AxiosError } from "axios";
import { useStorage } from "./useStorage";

export function useApi() {
  const { getAuthStorage, saveAuthStorage } = useStorage();
  const authApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  });
  authApi.defaults.headers.common["Content-Type"] = "application/json";
  const refreshAccessTokenFn = async () => {
    const response = await authApi.post<BaseApiResponse<AuthToken>>(
      "/api/auth/refresh-token",
      { refreshToken: getAuthStorage()?.refreshToken }
    );
    if (response.data.data) saveAuthStorage(response.data.data);
    return response.data;
  };
  authApi.interceptors.request.use((request) => {
    request.headers.setAuthorization(`Bearer ${getAuthStorage()?.accessToken}`);
    return request;
  });
  authApi.interceptors.response.use(
    (response) => {
      console.debug("response", response);
      return response;
    },
    async (error: AxiosError) => {
      console.debug("error", error);
      const originalRequest = error.config;
      const errMessage = (error.response?.data as any)?.error?.message;
      const errorName = (error.response?.data as any)?.error?.errorName;
      if (
        (errMessage.includes("TokenExpiredError") ||
          errorName.includes("TokenExpiredError")) &&
        !(originalRequest as any)?._retry
      ) {
        (originalRequest as any)._retry = true;
        await refreshAccessTokenFn();
        return authApi(
          originalRequest
            ? originalRequest
            : {
                baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
              }
        );
      }
      return Promise.reject(error);
    }
  );
  return authApi;
}
