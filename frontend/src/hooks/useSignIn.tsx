import { SignInInput, User } from "@/types/user";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { AuthToken } from "@/types/authToken";
import { useState } from "react";
import { ME_QUERY_KEY, useMe } from "./useMe";

export const AUTH_QUERY_KEY = "auth";

type IUseSignIn = {
  signInMutation: UseMutateFunction<AuthToken, unknown, SignInInput, unknown>;
  loading: boolean;
  result: AuthToken | null;
};

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

export function useSignIn(): IUseSignIn {
  const queryClient = useQueryClient();
  const { saveAuthStorage } = useStorage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuthToken | null>(null);

  const { mutate: signInMutation } = useMutation<
    AuthToken,
    unknown,
    SignInInput,
    unknown
  >(
    (signInInput) => {
      setLoading(true);
      return signIn(signInInput);
    },
    {
      onSuccess: (response) => {
        saveAuthStorage(response);
        queryClient.setQueryData([AUTH_QUERY_KEY], response);
        queryClient.invalidateQueries({queryKey: [ME_QUERY_KEY]})
        setLoading(false);
        setResult(response);
      },
      onError: (error) => {
        setLoading(false);
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  return { signInMutation, loading, result };
}
