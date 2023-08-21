import { User } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { useEffect } from "react";
import { AuthToken } from "@/types/authToken";
import { useApi } from "./useApi";

export const ME_QUERY_KEY = "me";

interface IUseUser {
  me: User | null;
  logout: () => void;
}

async function getMe(
  tokens: AuthToken | null | undefined
): Promise<User | null> {
  if (!tokens) return null;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/users/me`,
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
  if (!response.ok)
    throw new Error("Failed on get user request" + JSON.stringify(response));

  return await response.json().then((r) => r.data);
}

export function useMe(): IUseUser {
  const queryClient = useQueryClient();
  const {
    saveUserStorage,
    removeUserStorage,
    getUserStorage,
    getAuthStorage,
    removeAuthStorage,
  } = useStorage();

  const { data: user } = useQuery(
    [ME_QUERY_KEY],
    async (): Promise<User | null> => getMe(getAuthStorage()),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      initialData: getUserStorage,
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
    me: user ?? null,
    logout,
  };
}
