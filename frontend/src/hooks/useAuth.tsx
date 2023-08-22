import { SignInInput, SignUpInput, User } from "@/types/user";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { AuthToken } from "@/types/authToken";
import { useState } from "react";
import { ME_QUERY_KEY, useMe } from "./useMe";
import { useToast } from "@/components/ui/use-toast";
import { useApi } from "./useApi";

export const AUTH_QUERY_KEY = "auth";

type UseAuthInterface = {
  signInMutation: UseMutateFunction<AuthToken, unknown, SignInInput, unknown>;
  loadingSignIn: boolean;
  resultSignIn: AuthToken | null;
  signUpMutation: UseMutateFunction<User, Error, SignUpInput, unknown>;
  loadingSignUp: boolean;
  resultSignUp: User | null;
  logout: () => void;
};

export function useAuth(): UseAuthInterface {
  const api = useApi();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { saveAuthStorage, removeAuthStorage } = useStorage();
  const [loadingSignIn, setLoadingSignIn] = useState(false);
  const [resultSignIn, setResultSignIn] = useState<AuthToken | null>(null);
  const [loadingSignUp, setLoadingSignUp] = useState(false);
  const [resultSignUp, setResultSignUp] = useState<User | null>(null);

  const { mutate: signInMutation } = useMutation<
    AuthToken,
    unknown,
    SignInInput,
    unknown
  >(
    (signInInput) => {
      setLoadingSignIn(true);
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
        queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
        setLoadingSignIn(false);
        setResultSignIn(response);
        queryClient.invalidateQueries([ME_QUERY_KEY])
        queryClient.refetchQueries([ME_QUERY_KEY])
      },
      onError: (error) => {
        setLoadingSignIn(false);
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  const { mutate: signUpMutation } = useMutation<
    User,
    Error,
    SignUpInput,
    unknown
  >(
    (signUpInput) => {
      setLoadingSignUp(true);
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
        setLoadingSignUp(false);
        setResultSignUp(response);
      },
      onError: (error: Error) => {
        toast({
          variant: "destructive",
          description: error.message,
        });
        setLoadingSignUp(false);
      },
    }
  );

  const logout = () => {
    queryClient.setQueryData([AUTH_QUERY_KEY], null);
    queryClient.setQueryData([ME_QUERY_KEY], null);
    removeAuthStorage;
  };

  return {
    signInMutation,
    loadingSignIn,
    resultSignIn,
    signUpMutation,
    loadingSignUp,
    resultSignUp,
    logout,
  };
}
