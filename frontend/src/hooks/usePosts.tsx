import { User } from "@/types/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStorage } from "./useStorage";
import { useEffect } from "react";
import { AuthToken } from "@/types/authToken";
import { useApi } from "./useApi";
import { PostApi } from "@/types/post";
import { BaseApiResponse } from "@/types/api";

interface IUseUser {
  posts: PostApi[];
  meta: any;
}

async function getPosts(): Promise<BaseApiResponse<PostApi[]>> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/articles`
  );
  if (!response.ok)
    throw new Error("Failed on get user request" + JSON.stringify(response));

  return await response.json();
}

export function usePosts(): IUseUser {
  const { data: postsAndMeta } = useQuery(
    ["posts"],
    async (): Promise<BaseApiResponse<PostApi[]>> => getPosts(),
    {
      initialData: () => ({ data: [], meta: {} }),
    }
  );

  return {
    posts: postsAndMeta.data,
    meta: postsAndMeta.meta,
  };
}
