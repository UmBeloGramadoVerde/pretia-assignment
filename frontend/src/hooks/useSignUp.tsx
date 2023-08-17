import { SignUpInput, User } from "@/types/user";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { AuthToken } from "@/types/authToken";

type IUseSignUp = UseMutateFunction<AuthToken, unknown, SignUpInput, unknown>;

async function signUp(signUpInput: SignUpInput): Promise<AuthToken> {
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
  if (!response.ok)
    throw new Error("Failed on sign in request" + JSON.stringify(response));

  return await response.json().then((r) => r.data);
}

export function useSignUp(): IUseSignUp {
  const queryClient = useQueryClient();

  const { mutate: signInMutation } = useMutation<
    AuthToken,
    unknown,
    SignUpInput,
    unknown
  >((signUpInput) => signUp(signUpInput), {
    onSuccess: (response) => {},
    onError: (error) => {
      throw new Error("Failed on sign up request" + error);
    },
  });

  return signInMutation;
}
