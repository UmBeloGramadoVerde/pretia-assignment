import { SignInInput, User } from "@/types/user";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { AuthToken } from "@/types/authToken";

type IUseSignIn = UseMutateFunction<AuthToken, unknown, SignInInput, unknown>;

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

  return await response.json().then((r) => {
    console.log(r);
    return r.data;
  });
}

export function useSignIn(): IUseSignIn {
  const queryClient = useQueryClient();
  const { saveAuthStorage } = useStorage();

  const { mutate: signInMutation } = useMutation<
    AuthToken,
    unknown,
    SignInInput,
    unknown
  >((signInInput) => signIn(signInInput), {
    onSuccess: (response) => {
      saveAuthStorage(response);
      queryClient.setQueryData(["auth"], response);
      return response
    },
    onError: (error) => {
      throw new Error("Failed on sign in request" + error);
    },
  });

  return signInMutation;
}
