import { AuthToken } from "@/types/authToken";
import { CreatePostInput, PostApi } from "@/types/post";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";

type IUseCreatePost = UseMutateFunction<PostApi, unknown, CreatePostInput, unknown>;

async function createPost(
  post: CreatePostInput,
  tokens: AuthToken | null | undefined
  ): Promise<PostApi> {
  console.debug('post', post)
  if (!tokens) throw new Error("No authToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
      body: JSON.stringify(post),
    }
  );
  if (!response.ok) throw new Error("Failed on sign in request");

  return await response.json().then(r=>r.data);
}

export function useCreatePost(): IUseCreatePost {
  const queryClient = useQueryClient();
  const { getAuthStorage } = useStorage();

  const { mutate: signInMutation } = useMutation<PostApi, unknown, CreatePostInput, unknown>(
    (post: CreatePostInput) => createPost(post, getAuthStorage()),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["post", data.title], data);
      },
      onError: (error) => {
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  return signInMutation;
}
