/* import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { useEffect } from "react";

interface IUseUser {
  user: User | null;
}

async function getUser(id: string | null | undefined): Promise<User | null> {
  if (!id) return null;
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
  if (!response.ok)
    throw new Error("Failed on get user request" + JSON.stringify(response));

  return await response.json();
}

export function useUser(): IUseUser {
const { getAuthStorage } = useStorage();
  const { data: user } = useQuery<User | null>(
    ["user"],
    async (): Promise<User | null> => getUser(user),
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

  useEffect(() => {
    if (!user) removeUserStorage();
    else saveUserStorage(user);
  }, [user]);

  return {
    user: user ?? null,
  };
}
 */