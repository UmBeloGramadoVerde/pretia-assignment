import { AuthToken } from "@/types/authToken";
import { CreatePostInput, Post } from "@/types/post";
import {
  UseMutateFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import axios from "axios";

type IUseCreatePost = UseMutateFunction<
  Post,
  unknown,
  CreatePostInput,
  unknown
>;

async function createPost(
  post: CreatePostInput,
  tokens: AuthToken | null | undefined
): Promise<Post> {
  console.debug("post", post);
  if (!tokens) throw new Error("No authToken");
  const formData = new FormData();
  formData.append("title", post.title);
  formData.append("textContent", post.textContent);
  formData.append("jsonContent", post.jsonContent);
  formData.append("imageContent", post.imageContent);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
  if (!response.status) throw new Error("Failed on create post request");

  return await response.data;
}

export function useCreatePost(): IUseCreatePost {
  const queryClient = useQueryClient();
  const { getAuthStorage } = useStorage();

  const { mutate: createPostMutation } = useMutation<
    Post,
    unknown,
    CreatePostInput,
    unknown
  >((post: CreatePostInput) => createPost(post, getAuthStorage()), {
    onSuccess: (data) => {
      queryClient.setQueryData(["post", data.id], data);
    },
    onError: (error) => {
      throw new Error("Failed on sign in request" + error);
    },
  });

  return createPostMutation;
}
