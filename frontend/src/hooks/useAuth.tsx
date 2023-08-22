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

export const AUTH_QUERY_KEY = "auth";

type UseAuthInterface = {
  signInMutation: UseMutateFunction<AuthToken, unknown, SignInInput, unknown>;
  loadingSignIn: boolean;
  resultSignIn: AuthToken | null;
  signUpMutation: UseMutateFunction<User, Error, SignUpInput, unknown>;
  loadingSignUp: boolean;
  resultSignUp: User | null;
};

async function signUp(signUpInput: SignUpInput): Promise<User> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpInput),
    }
  );
  const jsonResponse = await response.json();
  if (!response.ok)
    throw new Error("Failed on sign up request: " + jsonResponse.error.message);

  return jsonResponse.data;
}

async function signIn(signInInput: SignInInput): Promise<AuthToken> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInInput),
    }
  );
  if (!response.ok)
    throw new Error("Failed on sign in request" + JSON.stringify(response));

  return await response.json().then((r) => r.data);
}

export function useAuth(): UseAuthInterface {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { saveAuthStorage } = useStorage();
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
      return signIn(signInInput);
    },
    {
      onSuccess: (response) => {
        saveAuthStorage(response);
        queryClient.setQueryData([AUTH_QUERY_KEY], response);
        queryClient.invalidateQueries({ queryKey: [ME_QUERY_KEY] });
        setLoadingSignIn(false);
        setResultSignIn(response);
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
      return signUp(signUpInput);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData([AUTH_QUERY_KEY], response);
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

  return {
    signInMutation,
    loadingSignIn,
    resultSignIn,
    signUpMutation,
    loadingSignUp,
    resultSignUp,
  };
}
