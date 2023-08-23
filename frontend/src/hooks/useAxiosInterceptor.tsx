import axios, {
  AxiosInstance,
  AxiosResponse,
  AxiosInterceptorOptions,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { AUTH_TOKEN_STORAGE_KEY, useStorage } from "./useStorage";
import { AuthToken } from "@/types/authToken";
import { toast } from "@/components/ui/use-toast";
import { BaseApiResponse } from "@/types/api";
import { useState } from "react";

const NO_AUTH_TOKEN_MESSAGE = "No Auth token";

export function useAxiosInterceptor() {
  const { getAuthStorage, saveAuthStorage } = useStorage();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [failedRequests, setFailedRequests] = useState<
    {
      resolve: (token: string | null) => void;
      reject: (reason?: any) => void;
    }[]
  >([]);

  const shouldIntercept = (error: any) => {
    try {
      return (
        error.response.status === 401 &&
        error.response.data.error.errorName.includes("UnauthorizedException")
      );
    } catch (e) {
      return false;
    }
  };
  const saveTokenData = (tokenData: AuthToken) => {
    saveAuthStorage(tokenData);
  };
  const handleTokenRefresh = (): Promise<AuthToken> => {
    const refreshToken = JSON.parse(
      window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY) ?? "{}"
    )?.refreshToken;
    return new Promise((resolve, reject) => {
      if (!refreshToken) {
        throw NO_AUTH_TOKEN_MESSAGE;
      }
      axios
        .post(
          process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/refresh-token",
          {
            refreshToken,
          }
        )
        .then((response: AxiosResponse<BaseApiResponse<AuthToken>>) => {
          resolve(response.data.data);
        })
        .catch((err) => {
          if (
            err.response.status === 401 &&
            err.response.data.error.errorName.includes("UnauthorizedException")
          ) {
            window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
          }
          throw err;
        });
    });
  };
  const applyAppTokenRefreshInterceptor = (axiosClient: AxiosInstance) => {
    const processQueue = (error: any, token: string | null) => {
      failedRequests.forEach((prom) => {
        if (error) {
          throw error;
        } else {
          prom.resolve(token);
        }
      });

      setFailedRequests([]);
    };

    const attachTokenToRequest = (
      request: InternalAxiosRequestConfig,
      token: string
    ) => {
      console.debug("request", request);
      request.headers["Authorization"] = "Bearer " + token;
    };

    const interceptor = (
      error: any
    ): Promise<Request | AxiosResponse<any, any>> => {
      if (!shouldIntercept(error)) {
        throw error;
      }
      console.debug("error", error);
      console.debug("error.config._retry", error.config._retry);

      if (error.config._retry || error.config._queued) {
        throw error;
      }

      const originalRequest = error.config;
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          setFailedRequests((prev) => [...prev, { resolve, reject }]);
        })
          .then((token) => {
            originalRequest._queued = true;
            attachTokenToRequest(originalRequest, token as string);
            return axiosClient.request(originalRequest);
          })
          .catch((error) => {
            throw error;
          });
      }

      originalRequest._retry = true;
      setIsRefreshing(true);
      return new Promise((resolve, reject) => {
        handleTokenRefresh
          .call(handleTokenRefresh)
          .then((tokenData: AuthToken) => {
            saveTokenData(tokenData);
            attachTokenToRequest(originalRequest, tokenData.accessToken);
            processQueue(null, tokenData.accessToken);
            resolve(axiosClient.request(originalRequest));
          })
          .catch((err) => {
            if (err == NO_AUTH_TOKEN_MESSAGE) {
              toast({
                variant: "destructive",
                description: "You must be signed in",
              });
            }
            processQueue(err, null);
            throw err;
          })
          .finally(() => {
            setIsRefreshing(false);
          });
      });
    };

    axiosClient.interceptors.response.use(undefined, interceptor, {});
  };

  const applyResponseFormattingInterceptor = (axiosClient: AxiosInstance) => {
    axiosClient.interceptors.response.use((response: AxiosResponse) => {
      return response.data;
    });
  };

  const applyAvailableAuthTokenInterceptor = (axiosClient: AxiosInstance) => {
    axiosClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const tokens = getAuthStorage();
        if (tokens?.accessToken) {
          config.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
        }
        return config;
      }
    );
  };

  return {
    applyAppTokenRefreshInterceptor,
    applyResponseFormattingInterceptor,
    applyAvailableAuthTokenInterceptor,
  };
}
