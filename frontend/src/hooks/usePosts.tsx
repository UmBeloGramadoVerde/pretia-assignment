import {
  DefinedUseQueryResult,
  UseMutateFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { AuthToken } from "@/types/authToken";
import { CreatePostInput, EditPostInput, Post } from "@/types/post";
import { BaseApiResponse } from "@/types/api";
import axios, { AxiosResponse } from "axios";
import { useApi } from "./useApi";

export const POSTS_QUERY_KEY = "posts";
export const POST_QUERY_KEY = "post";

type UsePostsInterface = {
  fetchPosts: FetchPostsInterface;
  fetchPost: FetchPostInterface;
  editPost: EditPostInterface;
  deletePost: DeletePostInterface;
  createPost: CreatePostInterface;
};

type FetchPostsInterface = DefinedUseQueryResult<Post[]>;

type FetchPostInterface = (
  id: string
) => DefinedUseQueryResult<Post>;

type CreatePostInterface = UseMutateFunction<
  Post,
  unknown,
  CreatePostInput,
  unknown
>;

type DeletePostInterface = UseMutateFunction<unknown, unknown, number, unknown>;

type EditPostInterface = UseMutateFunction<
  Post,
  unknown,
  EditPostInput,
  unknown
>;

export function usePosts(): UsePostsInterface {
  const queryClient = useQueryClient();
  const api = useApi();

  const fetchPosts = useQuery(
    [POSTS_QUERY_KEY],
    async (): Promise<Post[]> =>
      api.get("/api/articles").then((response) => response.data.data),
    {
      initialData: () => ([]),
    }
  );

  const fetchPost = (id: string) =>
    useQuery(
      [POST_QUERY_KEY, id],
      async (): Promise<Post> =>
        api.get("/api/articles/" + id).then((response) => response.data.data),
      {
        initialData: () => ({} as Post),
      }
    );

  const { mutate: editPostMutation } = useMutation<
    Post,
    unknown,
    EditPostInput,
    unknown
  >(
    (input: EditPostInput) => {
      const formData = new FormData();
      formData.append("title", input.post.title);
      formData.append("textContent", input.post.textContent);
      formData.append("jsonContent", input.post.jsonContent);
      formData.append("imageContent", input.post.imageContent);
      return api.patch(`/api/articles/${input.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: (data) => {
        console.debug("data", data);
        queryClient.setQueryData([POST_QUERY_KEY, data.id], data);
        queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      },
      onError: (error) => {
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  const { mutate: deletePostMutation } = useMutation<
    boolean,
    unknown,
    number,
    unknown
  >(
    (postId: number) => {
      return api.delete(`/api/articles/${postId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      },
      onError: (error) => {
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  const { mutate: createPostMutation } = useMutation<
    Post,
    unknown,
    CreatePostInput,
    unknown
  >(
    (post: CreatePostInput) => {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("textContent", post.textContent);
      formData.append("jsonContent", post.jsonContent);
      formData.append("imageContent", post.imageContent);
      return api.post(`/api/articles`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    {
      onSuccess: (data) => {
        queryClient.setQueryData([POST_QUERY_KEY, data.id], data);
        queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
      },
      onError: (error) => {
        throw new Error("Failed on sign in request" + error);
      },
    }
  );

  return {
    fetchPosts,
    fetchPost,
    editPost: editPostMutation,
    deletePost: deletePostMutation,
    createPost: createPostMutation,
  };
}
