import { SignUpInput, User } from "@/types/user";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { AuthToken } from "@/types/authToken";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AUTH_QUERY_KEY } from "./useSignIn";

type IUseSignUp = {
  signUpMutation: UseMutateFunction<User, Error, SignUpInput, unknown>;
  loading: boolean;
  result: User | null;
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

export function useSignUp(): IUseSignUp {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<User | null>(null);
  const { mutate: signUpMutation } = useMutation<
    User,
    Error,
    SignUpInput,
    unknown
  >(
    (signUpInput) => {
      setLoading(true);
      return signUp(signUpInput);
    },
    {
      onSuccess: (response) => {
        queryClient.setQueryData([AUTH_QUERY_KEY], response);
        setLoading(false);
        setResult(response);
      },
      onError: (error: Error) => {
        toast({
          variant: "destructive",
          description: error.message,
        });
        setLoading(false);
      },
    }
  );

  return { signUpMutation, loading, result };
}
