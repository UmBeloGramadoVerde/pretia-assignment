import { useQuery } from "@tanstack/react-query";
import { Post } from "@/types/post";
import { BaseApiResponse } from "@/types/api";

export const POST_QUERY_KEY = "post";

interface IUsePost {
  post: Post;
  meta: any;
}

async function getPost(id: string): Promise<BaseApiResponse<Post>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles/${id}`
  );
  if (!response.ok)
    throw new Error("Failed on get user request" + JSON.stringify(response));

  return await response.json();
}

export function usePost(id: string): IUsePost {
  const { data: postAndMeta } = useQuery(
    [POST_QUERY_KEY, id],
    async (): Promise<BaseApiResponse<Post>> => getPost(id),
    {
      initialData: () => ({ data: {} as Post, meta: {} }),
    }
  );

  return {
    post: postAndMeta.data,
    meta: postAndMeta.meta,
  };
}
