import { AuthToken } from "@/types/authToken";
import { Post } from "@/types/post";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";

type IUseDeletePost = UseMutateFunction<
  unknown,
  unknown,
  number,
  unknown
>;

async function deletePost(
  postId: number,
  tokens: AuthToken | null | undefined
): Promise<boolean> {
  if (!tokens) throw new Error("No authToken");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles/${postId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed on delete post request");

  return await response.ok
}

export function useDeletePost(): IUseDeletePost {
  const queryClient = useQueryClient();
  const { getAuthStorage } = useStorage();

  const { mutate: deletePostMutation } = useMutation<
    boolean,
    unknown,
    number,
    unknown
  >((postId: number) => deletePost(postId, getAuthStorage()), {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    },
    onError: (error) => {
      throw new Error("Failed on sign in request" + error);
    },
  });

  return deletePostMutation;
}
