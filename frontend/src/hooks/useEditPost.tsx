import { AuthToken } from "@/types/authToken";
import { EditPostInput, Post } from "@/types/post";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import axios from "axios";

type IUseEditPost = UseMutateFunction<Post, unknown, EditPostInput, unknown>;

async function editPost(
  input: EditPostInput,
  tokens: AuthToken | null | undefined
  ): Promise<Post> {
  console.debug('post', input)
  if (!tokens) throw new Error("No authToken");
  const formData = new FormData();
  formData.append("title", input.post.title);
  formData.append("textContent", input.post.textContent);
  formData.append("jsonContent", input.post.jsonContent);
  formData.append("imageContent", input.post.imageContent);
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles/${input.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
  if (!response.status) throw new Error("Failed on edit post request");

  return await response.data;
}

export function useEditPost(): IUseEditPost {
  const queryClient = useQueryClient();
  const { getAuthStorage } = useStorage();

  const { mutate: editPostMutation } = useMutation<Post, unknown, EditPostInput, unknown>(
    (input: EditPostInput) => editPost(input, getAuthStorage()),
    {
      onSuccess: (data) => {
        console.debug('data', data)
        queryClient.setQueryData(["post", data.id], data);
        queryClient.invalidateQueries({ queryKey: ['posts'] })
      },
      onError: (error) => {
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  return editPostMutation;
}
