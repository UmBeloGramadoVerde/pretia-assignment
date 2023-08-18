import { AuthToken } from "@/types/authToken";
import { EditPostInput, Post } from "@/types/post";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";

type IUseEditPost = UseMutateFunction<Post, unknown, EditPostInput, unknown>;

async function editPost(
  input: EditPostInput,
  tokens: AuthToken | null | undefined
  ): Promise<Post> {
  console.debug('post', input)
  if (!tokens) throw new Error("No authToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles/${input.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify(input.post),
    }
  );
  if (!response.ok) throw new Error("Failed on edit post request");

  return await response.json().then(r=>r.data);
}

export function useEditPost(): IUseEditPost {
  const queryClient = useQueryClient();
  const { getAuthStorage } = useStorage();

  const { mutate: editPostMutation } = useMutation<Post, unknown, EditPostInput, unknown>(
    (input: EditPostInput) => editPost(input, getAuthStorage()),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["post", data.title], data);
      },
      onError: (error) => {
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  return editPostMutation;
}
