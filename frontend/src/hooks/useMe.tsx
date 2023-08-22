import { User } from "@/types/user";
import {
  DefinedUseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { useEffect, useState } from "react";
import { AuthToken } from "@/types/authToken";
import { useApi } from "./useApi";
import { BaseApiResponse } from "@/types/api";
import axios from "axios";

export const ME_QUERY_KEY = "me";

interface IUseUser {
  fetchMe: DefinedUseQueryResult<User | null | undefined>;
  logout: () => void;
}

export function useMe(): IUseUser {
  const queryClient = useQueryClient();
  const api = useApi();
  const [user, setUser] = useState<User | null | undefined>(null);
  const {
    saveUserStorage,
    removeUserStorage,
    getUserStorage,
    getAuthStorage,
    removeAuthStorage,
  } = useStorage();

  const fetchMe = useQuery(
    [ME_QUERY_KEY],
    async (): Promise<User | null> => {
      console.log(api.interceptors);
      const resp = (await api.get("/api/users/me"))?.data;
      console.log(resp);
      return resp.data;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: getUserStorage,
      onSuccess: (result) => {
        console.log(result);
        setUser(result);
      },
      onError: () => {
        removeUserStorage();
      },
    }
  );

  const logout = () => {
    queryClient.setQueryData([ME_QUERY_KEY], null);
    removeUserStorage();
    removeAuthStorage;
  };

  useEffect(() => {
    if (!user) removeUserStorage();
    else saveUserStorage(user);
  }, [user]);

  return {
    fetchMe,
    logout,
  };
}
