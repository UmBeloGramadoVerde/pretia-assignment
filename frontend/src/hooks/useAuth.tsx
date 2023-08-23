import { SignInInput, SignUpInput, User } from "@/types/user";
import {
  UseMutateFunction,
  UseMutationResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { AuthToken } from "@/types/authToken";
import { useEffect, useState } from "react";
import { ME_QUERY_KEY, useMe } from "./useMe";
import { useToast } from "@/components/ui/use-toast";
import { useApi } from "./useApi";
import { useRouter } from "next/navigation";

export const AUTH_QUERY_KEY = "auth";

type UseAuthInterface = {
  signIn: UseMutationResult<AuthToken, unknown, SignInInput, unknown>;
  signUp: UseMutationResult<User, Error, SignUpInput, unknown>;
  authToken: string | null;
  isLoggedIn: boolean;
  logout: () => void;
};

export function useAuth(): UseAuthInterface {
  const api = useApi();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { saveAuthStorage, removeAuthStorage, getAuthStorage } = useStorage();

  const signInMutation = useMutation<AuthToken, unknown, SignInInput, unknown>(
    (signInInput) => {
      return api
        .post("/api/auth/login", JSON.stringify(signInInput), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (response) => {
        saveAuthStorage(response);
        queryClient.setQueryData([AUTH_QUERY_KEY], response);
        queryClient.invalidateQueries([ME_QUERY_KEY]);
        queryClient.refetchQueries([ME_QUERY_KEY]);
      },
      onError: (error) => {
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  const signUpMutation = useMutation<User, Error, SignUpInput, unknown>(
    (signUpInput) => {
      return api
        .post("/api/auth/register", JSON.stringify(signUpInput), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => response.data);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData([ME_QUERY_KEY], response);
      },
      onError: (error: any) => {
        console.debug("error", error);
        toast({
          variant: "destructive",
          description: error.response.data.error.message ?? error.message,
        });
      },
    }
  );

  const logout = () => {
    queryClient.setQueryData([AUTH_QUERY_KEY], null);
    queryClient.setQueryData([ME_QUERY_KEY], null);
    removeAuthStorage();
    router.push("/");
  };

  useEffect(() => {
    const storedAuthTokens = getAuthStorage();
    if (storedAuthTokens) {
      queryClient.setQueryData([AUTH_QUERY_KEY], storedAuthTokens);
      queryClient.refetchQueries([ME_QUERY_KEY]);
    }
  }, []);

  const authTokens = useQuery<AuthToken | null>([AUTH_QUERY_KEY]);

  return {
    signIn: signInMutation,
    signUp: signUpMutation,
    authToken: authTokens.data?.accessToken ?? null,
    isLoggedIn: !!authTokens.data?.accessToken,
    logout,
  };
}
